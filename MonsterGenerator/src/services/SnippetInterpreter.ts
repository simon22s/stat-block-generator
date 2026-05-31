import { Ability } from "../enums/Ability";
import StatBlock from "../models/StatBlock";
import DiceUtilities from "./DiceUtilities";

export default class SnippetInterpreter {
    public static interpretEffectTextSnippets(effectText: string, statBlock: StatBlock): string {
        let result = SnippetInterpreter.interpretSaveDC(effectText, statBlock);

        const startOfDmgExp = '{{dmgMod:';
        const endOfDmgExp = '}}';
        const fullDmgExp = /{{dmgMod:\d*\.?\d*}}/;
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

    private static interpretSaveDC(effectText: string, statBlock: StatBlock): string {
        const martialSaveDCRegEx = /{{saveDC:martial}}/g;
        const martialSaveDC = Math.max(statBlock.getSaveDCForAbility(Ability.Strength), statBlock.getSaveDCForAbility(Ability.Dexterity));
        let result = effectText.replaceAll(martialSaveDCRegEx, `DC ${martialSaveDC}`);

        const spellSaveDCRegEx = /{{saveDC:spell}}/g;
        const spellSaveDC = Math.max(statBlock.getSaveDCForAbility(Ability.Intelligence), statBlock.getSaveDCForAbility(Ability.Wisdom), statBlock.getSaveDCForAbility(Ability.Charisma));
        result = result.replaceAll(spellSaveDCRegEx, `DC ${spellSaveDC}`);

        const startOfSaveExp = '{{saveDC:';
        const endOfSaveExp = '}}';
        const fullSaveExp = /{{saveDC:[A-Za-z]*}}/;
        while (result.indexOf(startOfSaveExp) >= 0 && result.indexOf(endOfSaveExp) > 0) {
            const saveExpIndex = result.indexOf(startOfSaveExp);
            const endOfSaveExpIndex = saveExpIndex + result.substring(saveExpIndex).indexOf(endOfSaveExp);    // find the next closing braces
            const abilityType = String(result.substring(saveExpIndex + startOfSaveExp.length, endOfSaveExpIndex));

            let saveDC = 10;
            if (abilityType.toLowerCase() == 'strength' || abilityType.toLowerCase() == 'str') {
                saveDC = statBlock.getSaveDCForAbility(Ability.Strength);
            }
            else if (abilityType.toLowerCase() == 'dexterity' || abilityType.toLowerCase() == 'dex') {
                saveDC = statBlock.getSaveDCForAbility(Ability.Dexterity);
            }
            else if (abilityType.toLowerCase() == 'constitution' || abilityType.toLowerCase() == 'con') {
                saveDC = statBlock.getSaveDCForAbility(Ability.Constitution);
            }
            else if (abilityType.toLowerCase() == 'intelligence' || abilityType.toLowerCase() == 'int') {
                saveDC = statBlock.getSaveDCForAbility(Ability.Intelligence);
            }
            else if (abilityType.toLowerCase() == 'wisdom' || abilityType.toLowerCase() == 'wis') {
                saveDC = statBlock.getSaveDCForAbility(Ability.Wisdom);
            }
            else if (abilityType.toLowerCase() == 'charisma' || abilityType.toLowerCase() == 'cha') {
                saveDC = statBlock.getSaveDCForAbility(Ability.Charisma);
            }

            result = result.replace(fullSaveExp, `DC ${saveDC}`);
        }
        return result;
    }
}