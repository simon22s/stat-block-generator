import { CombatRole } from '../enums/CombatRole'
import { Rank } from '../enums/Rank'
import { AttributePreference } from '../enums/AttributePreferences'

export default class InputData {
    public level: number = 1;
    public role: CombatRole = CombatRole.None;
    public rank: Rank = Rank.Grunt;
    public threatLevel: number = 1;

    public strPref: AttributePreference = AttributePreference.High;
    public dexPref: AttributePreference = AttributePreference.High;
    public conPref: AttributePreference = AttributePreference.Medium;
    public intPref: AttributePreference = AttributePreference.Medium;
    public wisPref: AttributePreference = AttributePreference.Low;
    public chaPref: AttributePreference = AttributePreference.Low;
}