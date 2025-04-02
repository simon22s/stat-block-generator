import { DamageType } from "../enums/DamageType";
import DiceUtilities from "../services/DiceUtilities";

export class DamageInstance {
    public damageType: DamageType = 'Bludgeoning';
    public damageMult: number = 1.0;

    public getHtmlText(baseDamage: number, statMod: number): string {
        const damageValue = Math.round(baseDamage * this.damageMult);
        const damageText = DiceUtilities.getDamageRollTextForAverageDamageValue(damageValue, statMod);

        return `${damageValue} (${damageText}) ${this.damageType.toLowerCase()} damage`;
    }
}