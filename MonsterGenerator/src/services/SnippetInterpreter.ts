import { Ability } from "../enums/Ability";
import StatBlock from "../models/StatBlock";
import DiceUtilities from "./DiceUtilities";

export default class SnippetInterpreter {
    public static interpretEffectTextSnippets(effectText: string, statBlock: StatBlock): string {
        const strSaveDCRegEx = /{{saveDC:martial}}/g;
        const martialSaveDC = Math.max(statBlock.getSaveDCForAbility(Ability.Strength), statBlock.getSaveDCForAbility(Ability.Dexterity));
        let result = effectText.replaceAll(strSaveDCRegEx, `DC ${martialSaveDC}`);

        const intSaveDCRegEx = /{{saveDC:spell}}/g;
        const spellSaveDC = Math.max(statBlock.getSaveDCForAbility(Ability.Intelligence), statBlock.getSaveDCForAbility(Ability.Wisdom), statBlock.getSaveDCForAbility(Ability.Charisma));
        result = result.replaceAll(intSaveDCRegEx, `DC ${spellSaveDC}`);

        const startOfDmgExp = '{{dmgMod:';
        const endOfDmgExp = '}}';
        const fullDmgExp = /{{dmgMod:.*}}/;
        while (result.indexOf(startOfDmgExp) >= 0 && result.indexOf(endOfDmgExp) > 0) {
            const dmgExpIndex = result.indexOf(startOfDmgExp);
            const endOfDmgExpIndex = dmgExpIndex + result.substring(dmgExpIndex).indexOf(endOfDmgExp);    // find the next closing braces
            const dmgMult = Number(result.substring(dmgExpIndex + startOfDmgExp.length, endOfDmgExpIndex));

            if (dmgMult) {
                const damageValue = Math.max(Math.round(dmgMult * statBlock.atkDamage), 1);
                const damageRoll = DiceUtilities.getDamageRollTextForAverageDamageValue(damageValue, 0);
                result = result.replace(fullDmgExp, `${damageValue} (${damageRoll})`);
            } else {
                break;  // could not parse correctly, just fail out
            }
        }

        const nameRegEx = /{{name}}/g;
        result = result.replaceAll(nameRegEx, `${statBlock.name}`);
        return result;
    }
}