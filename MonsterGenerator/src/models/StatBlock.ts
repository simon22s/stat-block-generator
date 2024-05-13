import { Ability } from '../enums/Ability'
import { AbilityLevel } from '../enums/AbilityLevel';
import { CombatRole } from '../enums/CombatRole';
import { Rank } from '../enums/Rank';
import { SkillToAbilityMap } from '../enums/Skill';
import { ActionInput } from './ActionInput';
import InputData from './InputData';
import { StatBlockHtmlEntry } from './StatBlockHtmlEntry';
import { Trait } from './Trait';
export default class StatBlock {
    public level: number = 1;
    public hp: number = 10;
    public armorClass: number = 1;
    public profBonus: number = 1;
    public speed: number = 30;

    public strMod: number = 0;
    public dexMod: number = 0;
    public conMod: number = 0;
    public intMod: number = 0;
    public wisMod: number = 0;
    public chaMod: number = 0;

    public baseAtkBonus: number = 1;
    public baseSaveDC: number = 1;
    public atkDamage: number = 1;

    public trainedSavingThrows: string[] = [];

    public skills: string[] = [];
    public damageVulnerabilities: string[] = [];
    public damageResistances: string[] = [];
    public damageImmunities: string[] = [];
    public conditionImmunities: string[] = [];
    public senses: string[] = [];

    public traits: StatBlockHtmlEntry[] = [];
    public actions: StatBlockHtmlEntry[] = [];
    public bonusActions: StatBlockHtmlEntry[] = [];
    public reactions: StatBlockHtmlEntry[] = [];
    public villainActions: StatBlockHtmlEntry[] = [];
    public multiAttackCount: number = 0;    // 0 implies no multiattack

    public threat: number = 1;

    public static calcStatBlock(input: InputData): StatBlock {
        let statBlock = this.getBaseStatBlock(input);
        statBlock = this.adjustStatBlockForRank(statBlock, input.rank);
        statBlock = this.adjustStatBlockForRole(statBlock, input.role);
        
        for (let i = 0; i < input.trainedSavingThrows.length; i++) {
            const ability: Ability = Ability[input.trainedSavingThrows[i] as keyof typeof Ability];
            statBlock.trainedSavingThrows.push(input.trainedSavingThrows[i].toString() + '+' + this.calcAbilityCheck(statBlock, ability, true));
        }
        
        for (let i = 0; i < input.skills.length; i++) {
            const ability: Ability = SkillToAbilityMap.convert(input.skills[i]);
            statBlock.skills.push(input.skills[i] + '+' + this.calcAbilityCheck(statBlock, ability, true));
        }

        statBlock = this.addSenseStringsToStatBlock(statBlock, input);
        statBlock = this.addAllActionsToStatBlock(statBlock, input);
        
        return statBlock;
    }

    private static getBaseStatBlock(input: InputData): StatBlock {
        const profBonus = Math.floor(1 + (input.level + 3) / 4);
        return {
            level: input.level,
            hp: 16 + (input.level * 7) + input.hpMod,
            armorClass: Math.floor(12 + (input.level / 4) + input.acMod),
            profBonus: profBonus,
            speed: 30,
            atkDamage: input.level * 3,
            strMod: this.calcBaseStatMod(input.strPref, input.level),
            dexMod: this.calcBaseStatMod(input.dexPref, input.level),
            conMod: this.calcBaseStatMod(input.conPref, input.level),
            intMod: this.calcBaseStatMod(input.intPref, input.level),
            wisMod: this.calcBaseStatMod(input.wisPref, input.level),
            chaMod: this.calcBaseStatMod(input.chaPref, input.level),
            baseAtkBonus: profBonus,
            baseSaveDC: 8 + profBonus,
            trainedSavingThrows: [],
            skills: [],
            damageVulnerabilities: input.damageVulnerabilities,
            damageResistances: input.damageResistances,
            damageImmunities: input.damageImmunities,
            conditionImmunities: input.conditionImmunities,
            senses: [],
            traits: input.traits.map(x => Trait.getHtml(x)),
            actions: [],
            bonusActions: [],
            reactions: [],
            villainActions: [],
            multiAttackCount: 0,
            threat: input.threatLevel
        };
    }

    private static adjustStatBlockForRank(statBlock: StatBlock, rank: Rank): StatBlock {
        switch (rank) {
            case (Rank.Minion):
                statBlock.hp * Math.floor(statBlock.hp * 0.2);
                statBlock.atkDamage * Math.floor(statBlock.atkDamage * 0.75);
                break;
            case (Rank.Elite):
                statBlock.armorClass += 1;
                statBlock.hp *= 2;
                statBlock.strMod += 1;
                statBlock.dexMod += 1;
                statBlock.conMod += 1;
                statBlock.intMod += 1;
                statBlock.wisMod += 1;
                statBlock.chaMod += 1;
                statBlock.atkDamage * Math.floor(statBlock.atkDamage * 1.1);
                break;
            case (Rank.Paragon):
                statBlock.armorClass += 2;
                statBlock.hp = Math.floor(statBlock.hp * statBlock.threat);
                statBlock.strMod += 2;
                statBlock.dexMod += 2;
                statBlock.conMod += 2;
                statBlock.intMod += 2;
                statBlock.wisMod += 2;
                statBlock.chaMod += 2;
                statBlock.atkDamage * Math.floor(statBlock.atkDamage * 1.2);
                break;
        }
        return statBlock;
    }

    private static adjustStatBlockForRole(statBlock: StatBlock, role: CombatRole): StatBlock {
        switch (role) {
            case CombatRole.Controller:
                statBlock.armorClass += 2;
                statBlock.atkDamage = Math.floor(statBlock.atkDamage * 0.75);
                break;
            case CombatRole.Defender:
                statBlock.speed -= 5;
                statBlock.armorClass += 4;
                statBlock.hp = Math.floor(statBlock.hp * 0.75);
                statBlock.atkDamage = Math.floor(statBlock.atkDamage * 0.75);
                break;
            case CombatRole.Lurker:
                if (statBlock.senses.findIndex(x => x == 'Stealth') < 0) {
                    statBlock.senses.push('Stealth');
                }
                statBlock.armorClass -= 4;
                statBlock.hp = Math.floor(statBlock.hp * 0.75);
                statBlock.atkDamage = Math.floor(statBlock.atkDamage * 1.25);
                break;
            case CombatRole.Skirmisher:
                if (statBlock.senses.findIndex(x => x == 'Perception') < 0) {
                    statBlock.senses.push('Perception');
                }
                statBlock.speed += 5;
                statBlock.armorClass -= 2;
                statBlock.hp = Math.floor(statBlock.hp * 0.75);
                break;
            case CombatRole.Supporter:
                statBlock.hp = Math.floor(statBlock.hp * 1.25);
                statBlock.atkDamage = Math.floor(statBlock.atkDamage * 0.75);
                break;
        }
        return statBlock;
    }

    private static calcBaseStatMod(pref: AbilityLevel, level: number) {
        switch (pref) {
            case AbilityLevel.Low:
                return Math.floor(level / 12 - 1);
            case AbilityLevel.Medium:
                return Math.floor(1 + level / 8);
            case AbilityLevel.High:
                return level < 8 ? Math.floor(3 + level / 4) : Math.floor(5 + (level - 8) / 8);
        }
    }

    public static calcAbilityCheck(statBlock: StatBlock, ability: Ability, isProf: boolean): number {
        const profBonus = isProf ? statBlock.profBonus : 0;

        switch (ability) {
            case Ability.Strength:
                return statBlock.strMod + profBonus;
            case Ability.Dexterity:
                return statBlock.dexMod + profBonus;
            case Ability.Constitution:
                return statBlock.conMod + profBonus;
            case Ability.Intelligence:
                return statBlock.intMod + profBonus;
            case Ability.Wisdom:
                return statBlock.wisMod + profBonus;
            case Ability.Charisma:
                return statBlock.chaMod + profBonus;
        }
    }

    private static addSenseStringsToStatBlock(statBlock: StatBlock, input: InputData) {
        statBlock.senses.push("passive perception " + (10 + this.calcAbilityCheck(statBlock, Ability.Wisdom, input.skills.findIndex(x => x == 'Perception') >= 0)));

        for (let i = 0; i < input.senses.length; i++) {
            statBlock.senses.push(input.senses[i].getDisplayString());
        }
        return statBlock;
    }

    public static calcSaveDCForAbility(statBlock: StatBlock, ability: Ability): number {
        return 8 + StatBlock.calcAbilityCheck(statBlock, ability, true);
    }

    public static addAllActionsToStatBlock(statBlock: StatBlock, input: InputData) {
        statBlock.actions = input.actions.filter(x => x.actionTime == 'Action').map(x => ActionInput.getHtml(x, statBlock));
        statBlock.bonusActions = input.actions.filter(x => x.actionTime == 'Bonus Action').map(x => ActionInput.getHtml(x, statBlock));
        statBlock.reactions = input.actions.filter(x => x.actionTime == 'Reaction').map(x => ActionInput.getHtml(x, statBlock));

        return statBlock;
    }
}