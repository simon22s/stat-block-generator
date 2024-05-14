export default class DiceUtilities {
    public static diceSizes = [4, 6, 8, 10, 12, 20];
    public static getDamageRollTextForAverageDamageValue(damage: number, relevantAbilityStatMod: number) {
        const damageToCalc = damage - relevantAbilityStatMod;
        let currBestDiceSize = 4;
        for (let i = 1; i < this.diceSizes.length; i++) {
            if (damageToCalc % this.getAverageValueOfDiceSize(this.diceSizes[i]) < damageToCalc % this.getAverageValueOfDiceSize(currBestDiceSize)) {
                currBestDiceSize = this.diceSizes[i];
            }
        }

        const numDiceNeeded = Math.max(Math.ceil(damageToCalc / this.getAverageValueOfDiceSize(currBestDiceSize)), 1);
        return `${numDiceNeeded}d${currBestDiceSize} + ${relevantAbilityStatMod}`;
    }

    private static getAverageValueOfDiceSize(diceSize: number): number {
        return (diceSize / 2) + 0.5;
    }
}