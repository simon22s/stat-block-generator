import { Condition } from "../enums/Conditions";
import { DamageType } from "../enums/DamageType";
import { Skill } from "../enums/Skill";
import { ActionInput, AttackActionInput } from "../models/ActionInput";
import InputData from "../models/InputData";
import { Sense } from "../models/Sense";
import { Trait } from "../models/Trait";

export default class MigrationUtilities {
    public static LoadJson(json: string): InputData {
        return MigrationUtilities.MigrateInputJson(json);
    }

    private static MigrateInputJson(json: string): InputData {
        const parsedJson = JSON.parse(json);

        const result = new InputData();
        result.name = parsedJson.name;
        result.level = +parsedJson.level;
        result.rank = parsedJson.rank;
        result.strPref = parsedJson.strPref;
        result.dexPref = parsedJson.dexPref;
        result.conPref = parsedJson.conPref;
        result.intPref = parsedJson.intPref;
        result.wisPref = parsedJson.wisPref;
        result.chaPref = parsedJson.chaPref;
        result.threatLevel = parsedJson.threatLevel;
        (result.trainedSavingThrows as string[]) = parsedJson.trainedSavingThrows;
        (result.skills as Skill[]) = parsedJson.skills;
        (result.damageVulnerabilities as DamageType[]) = parsedJson.damageVulnerabilities;
        (result.damageResistances as DamageType[]) = parsedJson.damageResistances;
        (result.damageImmunities as DamageType[]) = parsedJson.damageImmunities;
        (result.conditionImmunities as Condition[]) = parsedJson.conditionImmunities;
        result.senses = (parsedJson.senses as []).map(x => MigrationUtilities.MigrateSenseJson(x));
        (result.traits as Trait[]) = parsedJson.traits;
        result.hpMult = +parsedJson.hpMult;
        result.acBonus = +parsedJson.acBonus ?? 0;
        result.dmgMult = +parsedJson.dmgMult;
        (result.actions as ActionInput[]) = (parsedJson.actions as []).map(x => MigrationUtilities.MigrateActionJson(x));
        result.statMods.strMod = +parsedJson.statMods.strMod;
        result.statMods.dexMod = +parsedJson.statMods.dexMod;
        result.statMods.conMod = +parsedJson.statMods.conMod;
        result.statMods.intMod = +parsedJson.statMods.intMod;
        result.statMods.wisMod = +parsedJson.statMods.wisMod;
        result.statMods.chaMod = +parsedJson.statMods.chaMod;

        return result;
    }

    private static MigrateActionJson(json: any): ActionInput {
        if (json.actionType == 'Attack') {
            const result = new AttackActionInput();

            result.attackStat = json.attackStat;
            result.attackRange = json.attackRange;
            result.attackType = json.attackStat;
            result.reach = json.reach ? json.reach : json.range;
            result.closeRange = json.closeRange ?? 0;
            result.farRange = json.farRange ?? 0;
            result.isProficient = json.isProficient;
            result.baseDamage = json.baseDamage ? json.baseDamage : {
                damageType: json.damageType,
                damageMult: json.damageMult,
            };
            result.bonusDamages = json.bonusDamages ?? [];
            return result;
        }
        else {
            return json as ActionInput;
        }
    }

    private static MigrateSenseJson(json: any): Sense {
        return new Sense(json.senseType, json.distance);
    }
}