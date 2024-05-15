export default class DiceUtilities {
    public static diceSizes = [4, 6, 8, 10, 12];
    public static getDamageRollTextForAverageDamageValue(damage: number, relevantAbilityStatMod: number) {
        const damageToCalc = damage - relevantAbilityStatMod;
        let currBestDiceSize = 12;
        let numDiceShouldBeFloor = false;
        for (let i = this.diceSizes.length - 2; i >= 0; i--) {
            const modResultForCurr = damageToCalc % this.getAverageValueOfDiceSize(currBestDiceSize);
            const oppOfModResultForCurr = currBestDiceSize - modResultForCurr;
            const modResultForDice = damageToCalc % this.getAverageValueOfDiceSize(this.diceSizes[i]);
            const oppOfModResultForDice = this.diceSizes[i] - modResultForDice;
            if (Math.min(modResultForDice, oppOfModResultForDice) < Math.min(modResultForCurr, oppOfModResultForCurr)) {
                currBestDiceSize = this.diceSizes[i];
                numDiceShouldBeFloor = modResultForDice < oppOfModResultForDice;
            }
        }

        const numDiceNeeded = numDiceShouldBeFloor ? Math.max(Math.floor(damageToCalc / this.getAverageValueOfDiceSize(currBestDiceSize)), 1) :
            Math.max(Math.ceil(damageToCalc / this.getAverageValueOfDiceSize(currBestDiceSize)), 1);
        const abilityText = relevantAbilityStatMod > 0 ? ` + ${relevantAbilityStatMod}` : '';
        return `${numDiceNeeded}d${currBestDiceSize}${abilityText}`;
    }

    private static getAverageValueOfDiceSize(diceSize: number): number {
        return (diceSize / 2) + 0.5;
    }
}