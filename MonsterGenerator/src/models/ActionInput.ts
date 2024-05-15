import { Ability } from "../enums/Ability";
import { ActionTime } from "../enums/ActionTime";
import { AttackRange } from "../enums/AttackRange";
import { AttackType } from "../enums/AttackType";
import { DamageType } from "../enums/DamageType";
import DiceUtilities from "../services/DiceUtilities";
import StatBlock from "./StatBlock";
import { StatBlockHtmlEntry } from "./StatBlockHtmlEntry";

export class ActionInput {
    public actionType: 'Attack' | 'General' = 'Attack';
    public name: string = '';
    public actionTime: ActionTime = 'Action';
    public isIncludedInMultiattack: boolean = false;
    public effectText: string = '';

    public static getHtml(action: ActionInput, statBlock: StatBlock): StatBlockHtmlEntry {
        if (action.actionType == 'Attack') {
            return AttackActionInput.getHtml(action as AttackActionInput, statBlock);
        } else {
            return {
                name: action.name,
                htmlText: `<b>${action.name} </b>` + this.interpretEffectTextSnippets(action.effectText, statBlock)
            }
        }
    }

    public static interpretEffectTextSnippets(effectText: string, statBlock: StatBlock): string {
        const strSaveDCRegEx = /{{saveDC:martial}}/;
        const martialSaveDC = Math.max(statBlock.getSaveDCForAbility(Ability.Strength), statBlock.getSaveDCForAbility(Ability.Dexterity));
        let result = effectText.replace(strSaveDCRegEx, `DC ${martialSaveDC}`);
        
        const intSaveDCRegEx = /{{saveDC:spell}}/;
        const spellSaveDC = Math.max(statBlock.getSaveDCForAbility(Ability.Intelligence), statBlock.getSaveDCForAbility(Ability.Wisdom), statBlock.getSaveDCForAbility(Ability.Charisma));
        result = result.replace(intSaveDCRegEx, `DC ${spellSaveDC}`);

        const startOfDmgExp = '{{dmgMod:';
        const endOfDmgExp = '}}';
        const fullDmgExp = /{{dmgMod:.*}}/;
        while (result.indexOf(startOfDmgExp) >= 0 && result.indexOf(endOfDmgExp) > 0) {
            const dmgExpIndex = result.indexOf(startOfDmgExp);
            const endOfDmgExpIndex = result.indexOf(endOfDmgExp);
            const dmgMult = Number(result.substring(dmgExpIndex + startOfDmgExp.length, endOfDmgExpIndex));

            if (dmgMult) {
                const damageRoll = DiceUtilities.getDamageRollTextForAverageDamageValue(Math.round(dmgMult * statBlock.atkDamage), 0);
                result = result.replace(fullDmgExp, damageRoll);
            }
        }
        return result;
    }
}

export class AttackActionInput extends ActionInput {
    public actionType: 'Attack' | 'General' = 'Attack';
    public attackStat: Ability = Ability.Strength;
    public attackRange: AttackRange = 'Melee';
    public attackType: AttackType = 'Weapon';
    public range: number = 5;
    public isProficient: boolean = true;
    public damageMult: number = 1;
    public damageType: DamageType = 'Bludgeoning';

    public static getHtml(action: AttackActionInput, statBlock: StatBlock): StatBlockHtmlEntry {
        const toHit = statBlock.getAbilityCheck(action.attackStat, action.isProficient);
        const relevantStatMod = statBlock.getStatMod(action.attackStat);
        const damageValue = Math.round(statBlock.atkDamage * action.damageMult);
        const damageText = DiceUtilities.getDamageRollTextForAverageDamageValue(damageValue, relevantStatMod);

        return {
            name: action.name,
            htmlText: `<b>${action.name} </b><i>${action.attackRange} ${action.attackType} attack:</i> +${toHit} to hit, reach ${action.range} ft. one target. Hit: ${damageValue} (${damageText}) ${action.damageType.toLowerCase()} damage. ${this.interpretEffectTextSnippets(action.effectText, statBlock)}`
        }
    }
}

export class GeneralActionInput extends ActionInput {
    public actionType: 'Attack' | 'General' = 'General';
}