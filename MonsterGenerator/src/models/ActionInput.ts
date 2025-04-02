import { Ability } from "../enums/Ability";
import { ActionTime } from "../enums/ActionTime";
import { AttackRange } from "../enums/AttackRange";
import { AttackType } from "../enums/AttackType";
import SnippetInterpreter from "../services/SnippetInterpreter";
import { DamageInstance } from "./DamageInstance";
import { SavingThrowEffect } from "./SavingThrowEffect";
import StatBlock from "./StatBlock";
import { StatBlockHtmlEntry } from "./StatBlockHtmlEntry";

export class ActionInput {
    public actionType: 'Attack' | 'General' = 'Attack';
    public name: string = '';
    public actionTime: ActionTime = 'Action';
    public isIncludedInMultiattack: boolean = false;
    public effectText: string = '';
    public savingThrowEffect: SavingThrowEffect | null = null;

    public static getHtml(action: ActionInput, statBlock: StatBlock): StatBlockHtmlEntry {
        if (action.actionType == 'Attack') {
            return AttackActionInput.getHtml(action as AttackActionInput, statBlock);
        } else {
            let effectString = '';
            if (action.effectText) {
                effectString += SnippetInterpreter.interpretEffectTextSnippets(action.effectText, statBlock);
            }
            if (action.savingThrowEffect) {
                effectString += ' ' + action.savingThrowEffect?.getHtmlText(statBlock);
            }
            return {
                name: action.name,
                htmlText: `<b>${action.name}. </b> ${effectString}`
            }
        }
    }
}

export class AttackActionInput extends ActionInput {
    public actionType: 'Attack' | 'General' = 'Attack';
    public attackStat: Ability = Ability.Strength;
    public attackRange: AttackRange = 'Melee';
    public attackType: AttackType = 'Weapon';
    public reach: number = 5;
    public closeRange: number = 0;
    public farRange: number = 0;
    public isProficient: boolean = true;
    public baseDamage: DamageInstance = new DamageInstance();
    public bonusDamages: DamageInstance[] = [];

    public static getHtml(action: AttackActionInput, statBlock: StatBlock): StatBlockHtmlEntry {
        const toHit = statBlock.getAbilityCheck(action.attackStat, action.isProficient);
        const relevantStatMod = statBlock.getStatMod(action.attackStat);

        let fullDamageText = action.baseDamage.getHtmlText(statBlock.atkDamage, relevantStatMod);

        for (const bonusDamage of action.bonusDamages) {
            fullDamageText += ` plus ${bonusDamage.getHtmlText(statBlock.atkDamage, relevantStatMod)}`;
        }

        let rangeText = `reach ${action.reach} ft.`;
        if (action.attackRange == 'Ranged') {
            rangeText = `range ${action.closeRange}/${action.farRange} ft.`
        }

        let effectString = '';
        if (action.effectText) {
            effectString += SnippetInterpreter.interpretEffectTextSnippets(action.effectText, statBlock);
        }
        if (action.savingThrowEffect) {
            effectString += ' ' + action.savingThrowEffect?.getHtmlText(statBlock);
        }

        return {
            name: action.name,
            htmlText: `<b>${action.name}. </b><i>${action.attackRange} ${action.attackType} Attack Roll:</i> +${toHit}, ${rangeText} <i>Hit:</i> ${fullDamageText}. ${effectString}`
        }
    }
}

export class GeneralActionInput extends ActionInput {
    public actionType: 'Attack' | 'General' = 'General';
}