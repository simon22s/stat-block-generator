export default class DiceUtilities {
    public static diceSizes = [4, 6, 8, 10, 12];
    public static getDamageRollTextForAverageDamageValue(damage: number, relevantAbilityStatMod: number) {
        const damageToCalc = damage - relevantAbilityStatMod;
        let currBestDiceSize = 4;
        let numDiceShouldBeFloor = false;
        for (let i = this.diceSizes.length - 2; i >= 0; i--) {
            const avgValueOfBest = this.getAverageValueOfDiceSize(currBestDiceSize);
            const modResultForBest = avgValueOfBest < damageToCalc ? damageToCalc % avgValueOfBest : avgValueOfBest - damageToCalc;
            const oppOfModResultForBest = currBestDiceSize - modResultForBest;
            const avgValueOfCurr = this.getAverageValueOfDiceSize(this.diceSizes[i]);
            const modResultForCurr = avgValueOfCurr < damageToCalc ? damageToCalc % this.getAverageValueOfDiceSize(this.diceSizes[i]) : avgValueOfCurr - damageToCalc;
            const oppOfModResultForCurr = this.diceSizes[i] - modResultForCurr;
            if (Math.min(modResultForCurr, oppOfModResultForCurr) < Math.min(modResultForBest, oppOfModResultForBest)) {
                currBestDiceSize = this.diceSizes[i];
                numDiceShouldBeFloor = modResultForCurr < oppOfModResultForCurr;
            }
        }

        let numDiceNeeded = numDiceShouldBeFloor ? Math.max(Math.floor(damageToCalc / this.getAverageValueOfDiceSize(currBestDiceSize)), 1) :
            Math.max(Math.ceil(damageToCalc / this.getAverageValueOfDiceSize(currBestDiceSize)), 1);

        if (numDiceNeeded > 12) {
            relevantAbilityStatMod += Math.round((numDiceNeeded - 12) * this.getAverageValueOfDiceSize(currBestDiceSize));
            numDiceNeeded = 12;
        }
        const abilityText = relevantAbilityStatMod > 0 ? ` + ${relevantAbilityStatMod}` : '';
        return `${numDiceNeeded}d${currBestDiceSize}${abilityText}`;
    }

    private static getAverageValueOfDiceSize(diceSize: number): number {
        return (diceSize / 2) + 0.5;
    }
}