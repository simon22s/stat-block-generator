import { CombatRole } from '../enums/CombatRole'
import { Rank } from '../enums/Rank'
import { AbilityLevel } from '../enums/AbilityLevel'
import { Skill } from '../enums/Skill'
import { DamageType } from '../enums/DamageType';
import { Condition } from '../enums/Conditions';

export default class InputData {
    public level: number = 1;
    public role: CombatRole = CombatRole.None;
    public rank: Rank = Rank.Grunt;
    public threatLevel: number = 1;

    public strPref: AbilityLevel = AbilityLevel.High;
    public dexPref: AbilityLevel = AbilityLevel.High;
    public conPref: AbilityLevel = AbilityLevel.Medium;
    public intPref: AbilityLevel = AbilityLevel.Medium;
    public wisPref: AbilityLevel = AbilityLevel.Low;
    public chaPref: AbilityLevel = AbilityLevel.Low;

    public trainedSavingThrows: string[] = [];

    public skills: Skill[] = [];
    public damageVulnerabilities: DamageType[] = [];
    public damageResistances: DamageType[] = [];
    public damageImmunities: DamageType[] = [];
    public conditionImmunities: Condition[] = [];
}