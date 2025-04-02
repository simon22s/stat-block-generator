import { Ability } from '../enums/Ability'
import { AbilityLevel } from '../enums/AbilityLevel';
import { DamageType, DamageTypes } from '../enums/DamageType';
import { Rank } from '../enums/Rank';
import { SkillToAbilityMap } from '../enums/Skill';
import { ActionInput } from './ActionInput';
import InputData from './InputData';
import { StatBlockHtmlEntry } from './StatBlockHtmlEntry';
import { Trait } from './Trait';
export default class StatBlock {
    public name: string = '';
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

    constructor(input: InputData) {
        const profBonus = Math.floor(1 + (input.level + 3) / 4);
        this.name = input.name;
        this.level = input.level;
        this.hp = 9 + (input.level * 7);
        this.armorClass = input.armor.armorValue + input.acBonus;
        this.profBonus = profBonus;
        this.speed = 30;
        this.atkDamage = input.level * 3;
        this.strMod = StatBlock.calcBaseStatMod(input.strPref, input.level);
        this.dexMod = StatBlock.calcBaseStatMod(input.dexPref, input.level);
        this.conMod = StatBlock.calcBaseStatMod(input.conPref, input.level);
        this.intMod = StatBlock.calcBaseStatMod(input.intPref, input.level);
        this.wisMod = StatBlock.calcBaseStatMod(input.wisPref, input.level);
        this.chaMod = StatBlock.calcBaseStatMod(input.chaPref, input.level);
        this.baseAtkBonus = profBonus;
        this.baseSaveDC = 8 + profBonus;
        this.trainedSavingThrows = [];
        this.skills = [];
        this.damageVulnerabilities = [];
        this.damageResistances = [];
        this.damageImmunities = [];
        this.conditionImmunities = input.conditionImmunities;
        this.senses = [];
        this.traits = [];
        this.actions = [];
        this.bonusActions = [];
        this.reactions = [];
        this.villainActions = [];
        this.multiAttackCount = 0;
        this.threat = input.threatLevel;

        this.calcStatBlock(input);
    }

    private calcStatBlock(input: InputData) {
        this.adjustStatBlockForRank(input.rank);
        this.applyAdjustments(input);
        this.adjustArmorClass(input);
        
        for (let i = 0; i < input.trainedSavingThrows.length; i++) {
            const ability: Ability = Ability[input.trainedSavingThrows[i] as keyof typeof Ability];
            this.trainedSavingThrows.push(input.trainedSavingThrows[i].toString() + '+' + this.getAbilityCheck(ability, true));
        }
        
        for (let i = 0; i < input.skills.length; i++) {
            const ability: Ability = SkillToAbilityMap.convert(input.skills[i]);
            this.skills.push(input.skills[i] + '+' + this.getAbilityCheck(ability, true));
        }

        this.processExtraStrings(input);
        this.addSenseStrings(input);
        this.addActionsAndTraits(input);
    }

    private adjustStatBlockForRank(rank: Rank) {
        this.hp = Math.floor(this.hp * this.threat);
        switch (rank) {
            case (Rank.Minion):
                this.atkDamage * Math.floor(this.atkDamage * 0.75);
                break;
            case (Rank.Elite):
                this.strMod += 1;
                this.dexMod += 1;
                this.conMod += 1;
                this.intMod += 1;
                this.wisMod += 1;
                this.chaMod += 1;
                this.atkDamage * Math.floor(this.atkDamage * 1.1);
                break;
            case (Rank.Paragon):
                this.strMod += 2;
                this.dexMod += 2;
                this.conMod += 2;
                this.intMod += 2;
                this.wisMod += 2;
                this.chaMod += 2;
                this.atkDamage * Math.floor(this.atkDamage * 1.2);
                break;
        }
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

    public getAbilityCheck(ability: Ability, isProf: boolean): number {
        const profBonus = isProf ? this.profBonus : 0;

        switch (ability) {
            case Ability.Strength:
                return this.strMod + profBonus;
            case Ability.Dexterity:
                return this.dexMod + profBonus;
            case Ability.Constitution:
                return this.conMod + profBonus;
            case Ability.Intelligence:
                return this.intMod + profBonus;
            case Ability.Wisdom:
                return this.wisMod + profBonus;
            case Ability.Charisma:
                return this.chaMod + profBonus;
        }
    }

    private addSenseStrings(input: InputData) {
        this.senses.push("passive perception " + (10 + this.getAbilityCheck(Ability.Wisdom, input.skills.findIndex(x => x == 'Perception') >= 0)));

        for (let i = 0; i < input.senses.length; i++) {
            this.senses.push(input.senses[i].getDisplayString());
        }
    }

    public getSaveDCForAbility(ability: Ability): number {
        return 8 + this.getAbilityCheck(ability, true);
    }

    public addActionsAndTraits(input: InputData) {
        this.traits = input.traits.map(x => Trait.getHtml(x, this));
        this.actions = input.actions.filter(x => x.actionTime == 'Action').map(x => ActionInput.getHtml(x, this));
        this.bonusActions = input.actions.filter(x => x.actionTime == 'Bonus Action').map(x => ActionInput.getHtml(x, this));
        this.reactions = input.actions.filter(x => x.actionTime == 'Reaction').map(x => ActionInput.getHtml(x, this));
        this.villainActions = input.actions.filter(x => x.actionTime == 'Villain Action').map(x => ActionInput.getHtml(x, this));
    }

    public getStatMod(ability: Ability) {
        switch (ability) {
            case Ability.Strength:
                return this.strMod;
                break;
            case Ability.Dexterity:
                return this.dexMod;
                break;
            case Ability.Constitution:
                return this.conMod;
                break;
            case Ability.Intelligence:
                return this.intMod;
                break;
            case Ability.Wisdom:
                return this.wisMod;
                break;
            case Ability.Charisma:
                return this.chaMod;
                break;
        }
    }

    private applyAdjustments(input: InputData) {
        this.hp = Math.max(Math.round(this.hp * input.hpMult), 1);
        this.atkDamage = Math.max(Math.round(this.atkDamage * input.dmgMult), 1);

        this.strMod = Math.max(this.strMod + input.statMods.strMod, -5);
        this.dexMod = Math.max(this.dexMod + input.statMods.dexMod, -5);
        this.conMod = Math.max(this.conMod + input.statMods.conMod, -5);
        this.intMod = Math.max(this.intMod + input.statMods.intMod, -5);
        this.wisMod = Math.max(this.wisMod + input.statMods.wisMod, -5);
        this.chaMod = Math.max(this.chaMod + input.statMods.chaMod, -5);
    }

    private processExtraStrings(input: InputData) {
        this.damageResistances = this.accumulatePhysicalDamageStrings(input.damageResistances);
        this.damageVulnerabilities = this.accumulatePhysicalDamageStrings(input.damageVulnerabilities);
        this.damageImmunities = this.accumulatePhysicalDamageStrings(input.damageImmunities);
    }

    private accumulatePhysicalDamageStrings(typeStrings: DamageType[]): string[] {
        const physDamageStrings = typeStrings.filter(x => this.isPhysicalNonmagicalDamageType(x)).map(x => x.toLowerCase());
        const nonphysDamageStrings = typeStrings.filter(x => !this.isPhysicalNonmagicalDamageType(x)).map(x => x.toLowerCase());

        if (physDamageStrings.length > 0) {
            return nonphysDamageStrings.map((x, index) => index < nonphysDamageStrings.length - 1 ? x + ', ' : x + '; ')
                .concat(physDamageStrings.map((x, index) => index < physDamageStrings.length - 1 ? x.split(' ')[0] + ', ' : x.split(' ')[0] + ' from non-magical damage'))
                .map(x => x.toLowerCase());
        } else {
            return typeStrings.map((x, index) => index < typeStrings.length - 1 ? x + ', ' : x).map(x => x.toLowerCase());
        }
    }

    private isPhysicalNonmagicalDamageType(damageType: DamageType): boolean{
        return damageType == 'Bludgeoning from Nonmagical' || damageType == 'Piercing from Nonmagical' || damageType == 'Slashing from Nonmagical';
    }

    private adjustArmorClass(input: InputData) {
        if (input.armor.armorBehavior == 'IncludeDex') {
            this.armorClass += this.dexMod;
        }
    }
}