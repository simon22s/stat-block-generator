import { Condition } from "../enums/Conditions";
import { DamageType } from "../enums/DamageType";
import { Skill } from "../enums/Skill";
import { ActionInput } from "../models/ActionInput";
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
        result.role = parsedJson.role;
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
        result.senses = [];
        parsedJson.senses.forEach(x => (result.senses as Sense[]).push(new Sense(x.senseType, x.distance)));
        (result.traits as Trait[]) = parsedJson.traits;
        result.hpMult = +parsedJson.hpMult;
        result.acMult = +parsedJson.acMult;
        result.dmgMult = +parsedJson.dmgMult;
        (result.actions as ActionInput[]) = parsedJson.actions;
        result.statMods.strMod = +parsedJson.statMods.strMod;
        result.statMods.dexMod = +parsedJson.statMods.dexMod;
        result.statMods.conMod = +parsedJson.statMods.conMod;
        result.statMods.intMod = +parsedJson.statMods.intMod;
        result.statMods.wisMod = +parsedJson.statMods.wisMod;
        result.statMods.chaMod = +parsedJson.statMods.chaMod;

        return result;
    }
}