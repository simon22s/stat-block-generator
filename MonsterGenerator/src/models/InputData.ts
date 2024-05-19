import { CombatRole } from '../enums/CombatRole'
import { Rank } from '../enums/Rank'
import { AbilityLevel } from '../enums/AbilityLevel'
import { Skill } from '../enums/Skill'
import { DamageType } from '../enums/DamageType';
import { Condition } from '../enums/Conditions';
import { Sense } from './Sense';
import { ActionInput } from './ActionInput';
import { Trait } from './Trait';
import { Ability } from '../enums/Ability';

export default class InputData {
    public name: string = '';
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
    public senses: Sense[] = [];

    public traits: Trait[] = [];
    public actions: ActionInput[] = [];

    public hpMult: number = 1;
    public acMult: number = 1;
    public dmgMult: number = 1;

    public statMods:
        {
            strMod: number,
            dexMod: number,
            conMod: number,
            intMod: number,
            wisMod: number,
            chaMod: number,
        };

    constructor() {
        this.statMods = {
            strMod: 0,
            dexMod: 0,
            conMod: 0,
            intMod: 0,
            wisMod: 0,
            chaMod: 0,
        };
    }
}