export type EncounterDifficulty = 'Trivial' | 'Easy' | 'Normal' | 'Hard' | 'Extreme';

export default class ThreatCalculator {
    public static calcThreatBudget(partySize: number, encounterDiff: EncounterDifficulty) {
        let diffMod = 1;
        switch (encounterDiff) {
            case 'Trivial':
                diffMod = 0.25;
                break;
            case 'Easy':
                diffMod = 0.5;
                break;
            case 'Hard':
                diffMod = 1.5;
                break;
            case 'Extreme':
                diffMod = 2;
                break;
        }
        return diffMod * partySize;
    }

    public static calcAdjustedThreatLevel(creatureLevel: number, creatureThreat: number, partyLevel: number) {
        const levelDiff = creatureLevel - partyLevel;
        let threatMult = 1;
        if (levelDiff > 0) {
            threatMult = 1 + Math.floor(levelDiff / 3);
        }
        else if(levelDiff < -2) {
            threatMult = 1 / (Math.floor((Math.abs(levelDiff)) / 3) * 2);
        }

        return creatureThreat * threatMult;
    }
}