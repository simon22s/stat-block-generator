import { Ability } from "../enums/Ability";
import { ActionTime } from "../enums/ActionTime";
import { AttackRange } from "../enums/AttackRange";
import { AttackType } from "../enums/AttackType";
import { DamageType } from "../enums/DamageType";
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
        const strSaveDCRegEx = /{{saveDC:str}}/;
        let result = effectText.replace(strSaveDCRegEx, `DC ${StatBlock.calcSaveDCForAbility(statBlock, Ability.Strength)}`);
        const dexSaveDCRegEx = /{{saveDC:dex}}/;
        result = result.replace(dexSaveDCRegEx, `DC ${StatBlock.calcSaveDCForAbility(statBlock, Ability.Dexterity)}`);
        const conSaveDCRegEx = /{{saveDC:con}}/;
        result = result.replace(conSaveDCRegEx, `DC ${StatBlock.calcSaveDCForAbility(statBlock, Ability.Constitution)}`);
        const intSaveDCRegEx = /{{saveDC:int}}/;
        result = result.replace(intSaveDCRegEx, `DC ${StatBlock.calcSaveDCForAbility(statBlock, Ability.Intelligence)}`);
        const wisSaveDCRegEx = /{{saveDC:wis}}/;
        result = result.replace(wisSaveDCRegEx, `DC ${StatBlock.calcSaveDCForAbility(statBlock, Ability.Wisdom)}`);
        const chaSaveDCRegEx = /{{saveDC:cha}}/;
        result = result.replace(chaSaveDCRegEx, `DC ${StatBlock.calcSaveDCForAbility(statBlock, Ability.Charisma)}`);

        /*const dmgExp = /{{avgDmg:.*}}/;
        const dmgSnippets = Array.from(result.matchAll(dmgExp));
        for (const snippet of dmgSnippets) {
            snippet.
        }*/
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
    public damageType: DamageType = 'Bludgeoning';

    public static getHtml(action: AttackActionInput, statBlock: StatBlock): StatBlockHtmlEntry {
        const toHit = StatBlock.calcAbilityCheck(statBlock, action.attackStat, action.isProficient);
        const avgDmg = statBlock.atkDamage;

        return {
            name: action.name,
            htmlText: `<b>${action.name} </b><i>${action.attackRange} ${action.attackType} attack:</i> +${toHit} to hit, reach ${action.range} ft. one target. Hit: ${avgDmg} ${action.damageType.toLowerCase()} damage. ${this.interpretEffectTextSnippets(action.effectText, statBlock)}`
        }
    }
}

export class GeneralActionInput extends ActionInput {
    public actionType: 'Attack' | 'General' = 'General';
}