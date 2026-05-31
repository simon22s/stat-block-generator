<template>
    <v-app>
        <div class="d-flex align-center flex-column">
            <ThreatCalculator :level="level" :threatLevel="threatLevel"></ThreatCalculator>
            <v-card width="90%" class="pa-8">
                <v-row>
                    <v-col cols="8">
                        <v-container>
                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="name" label="Name">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-dialog max-width="500">
                                        <template v-slot:activator="{ props: activatorProps }">
                                            <v-btn v-bind="activatorProps"
                                                   icon="mdi-content-save-edit">
                                            </v-btn>
                                        </template>
                                        <template v-slot:default="{ isActive }">
                                            <SerializationModal :inputJson="currentInputJson" @saveJson="onSaveJson" @closeModal="isActive.value = false"></SerializationModal>
                                        </template>
                                    </v-dialog>
                                </v-col>
                                <v-col cols="2">
                                    <SaveToImageButton></SaveToImageButton>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="8">
                                    <span>Level</span>
                                    <v-slider v-model="level" :min="1" :max="20" :step="1" hide-details>
                                        <template v-slot:append>
                                            <v-text-field v-model="level" type="number" hide-details>
                                            </v-text-field>
                                        </template>
                                    </v-slider>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="creatureType" label="Creature Type">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <span>Rank</span>
                                    <v-combobox v-model="rank" :items="rankItems" item-value="value" item-title="text" :return-object="false">
                                    </v-combobox>
                                </v-col>
                                <v-col>
                                    <span>Threat Level</span>
                                    <v-slider v-model="threatLevel" :min="0.25" :max="10" :step="0.25" :disabled="isThreatLevelDisabled" hide-details>
                                        <template v-slot:append>
                                            <v-text-field v-model="threatLevel" type="number" hide-details>
                                            </v-text-field>
                                        </template>
                                    </v-slider>
                                </v-col>
                            </v-row>
                            <v-expansion-panels>
                                <v-expansion-panel title="Armor">
                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-checkbox v-model="armorIncludesDex" label="Include DEX"></v-checkbox>
                                        </v-row>
                                        <v-row>
                                            <v-slider v-model="armorValue" :min="1" :max="50" :step="1" hide-details>
                                                <template v-slot:append>
                                                    <v-text-field v-model="armorValue" type="number" hide-details>
                                                    </v-text-field>
                                                </template>
                                            </v-slider>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel title="Abilities & Saving Throws">
                                    <v-expansion-panel-text>
                                        <v-table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th class="text-center" width="15%">
                                                        STR
                                                    </th>
                                                    <th class="text-center" width="15%">
                                                        DEX
                                                    </th>
                                                    <th class="text-center" width="15%">
                                                        CON
                                                    </th>
                                                    <th class="text-center" width="15%">
                                                        INT
                                                    </th>
                                                    <th class="text-center" width="15%">
                                                        WIS
                                                    </th>
                                                    <th class="text-center" width="15%">
                                                        CHA
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Modifiers
                                                    </td>
                                                    <td>
                                                        <v-combobox v-model="strAttr" :items="attrItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                                                    </td>
                                                    <td>
                                                        <v-combobox v-model="dexAttr" :items="attrItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                                                    </td>
                                                    <td>
                                                        <v-combobox v-model="conAttr" :items="attrItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                                                    </td>
                                                    <td>
                                                        <v-combobox v-model="intAttr" :items="attrItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                                                    </td>
                                                    <td>
                                                        <v-combobox v-model="wisAttr" :items="attrItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                                                    </td>
                                                    <td>
                                                        <v-combobox v-model="chaAttr" :items="attrItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>TSTs</div> <div>(Max {{numTrainedSavingThrows}})</div>
                                                    </td>
                                                    <td>
                                                        <v-checkbox v-model="selectedSaves" value="Strength" hide-details></v-checkbox>
                                                    </td>
                                                    <td>
                                                        <v-checkbox v-model="selectedSaves" value="Dexterity" hide-details></v-checkbox>
                                                    </td>
                                                    <td>
                                                        <v-checkbox v-model="selectedSaves" value="Constitution" hide-details></v-checkbox>
                                                    </td>
                                                    <td>
                                                        <v-checkbox v-model="selectedSaves" value="Intelligence" hide-details></v-checkbox>
                                                    </td>
                                                    <td>
                                                        <v-checkbox v-model="selectedSaves" value="Wisdom" hide-details></v-checkbox>
                                                    </td>
                                                    <td>
                                                        <v-checkbox v-model="selectedSaves" value="Charisma" hide-details></v-checkbox>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-table>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel title="Extras">
                                    <v-expansion-panel-text>
                                        <v-combobox v-model="skills"
                                                    :items="skillItems"
                                                    label="Skills"
                                                    multiple
                                                    chips>
                                        </v-combobox>
                                        <v-combobox v-model="damageVulnerabilities"
                                                    :items="damageItems"
                                                    label="Damage Vulnerabilities"
                                                    multiple
                                                    chips>
                                        </v-combobox>
                                        <v-combobox v-model="damageResistances"
                                                    :items="damageItems"
                                                    label="Damage Resistances"
                                                    multiple
                                                    chips>
                                        </v-combobox>
                                        <v-combobox v-model="damageImmunities"
                                                    :items="damageItems"
                                                    label="Damage Immunities"
                                                    multiple
                                                    chips>
                                        </v-combobox>
                                        <v-combobox v-model="conditionImmunities"
                                                    :items="conditionItems"
                                                    label="Condition Immunities"
                                                    multiple
                                                    chips>
                                        </v-combobox>
                                        <v-dialog v-for="sense in senses" :key="sense" max-width="500">
                                            <template v-slot:activator="{ props: activatorProps }">
                                                <v-chip v-bind="activatorProps" class="mr-2" closable @click:close="onRemoveSense(sense)">
                                                    {{sense.getDisplayString()}}
                                                </v-chip>
                                            </template>
                                            <template v-slot:default="{ isActive }">
                                                <SenseEditor :isAddingSense="false" :existingSense="sense" @closeEditor="isActive.value = false"></SenseEditor>
                                            </template>
                                        </v-dialog>
                                        <v-dialog max-width="500">
                                            <template v-slot:activator="{ props: activatorProps }">
                                                <v-btn v-bind="activatorProps"
                                                       text="Add Sense">
                                                </v-btn>
                                            </template>
                                            <template v-slot:default="{ isActive }">
                                                <SenseEditor :isAddingSense="true" @addSense="onAddSense" @closeEditor="isActive.value = false"></SenseEditor>
                                            </template>
                                        </v-dialog>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel title="Traits">
                                    <v-expansion-panel-text>
                                        <CustomizableList :list="traits" :shouldUseTraitEditor=true>
                                        </CustomizableList>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel title="Actions">
                                    <v-expansion-panel-text>
                                        <CustomizableList :list="actions" :shouldUseTraitEditor=false>
                                        </CustomizableList>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel title="Adjustments">
                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-span>HP Multiplier </v-span>
                                            <v-slider v-model="hpMult" :min="0.01" :max="10.00" :step="0.01" hide-details>
                                                <template v-slot:append>
                                                    <v-text-field v-model="hpMult" type="number" hide-details>
                                                    </v-text-field>
                                                </template>
                                            </v-slider>
                                        </v-row>
                                        <v-row>
                                            <v-span>AC Bonus </v-span>
                                            <v-slider v-model="acBonus" :min="0" :max="20" :step="1" hide-details>
                                                <template v-slot:append>
                                                    <v-text-field v-model="acBonus" type="number" hide-details>
                                                    </v-text-field>
                                                </template>
                                            </v-slider>
                                        </v-row>
                                        <v-row>
                                            <v-span>Damage Multiplier </v-span>
                                            <v-slider v-model="dmgMult" :min="0.01" :max="10.00" :step="0.01" hide-details>
                                                <template v-slot:append>
                                                    <v-text-field v-model="dmgMult" type="number" hide-details>
                                                    </v-text-field>
                                                </template>
                                            </v-slider>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field v-model ="strMod" type="number" :step="1" hide-details>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model ="dexMod" type="number" :step="1" hide-details>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model ="conMod" type="number" :step="1" hide-details>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model ="intMod" type="number" :step="1" hide-details>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model ="wisMod" type="number" :step="1" hide-details>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model ="chaMod" type="number" :step="1" hide-details>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-container>
                    </v-col>
                    <v-col>
                        <GeneratedOutput :inputData="currentInput"></GeneratedOutput>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Ability } from './enums/Ability';
import { Rank } from './enums/Rank';
import { AbilityLevel } from './enums/AbilityLevel';
import InputData from './models/InputData';
import { Sense } from './models/Sense';
import ThreatCalculator from './components/ThreatCalculator.vue';
import GeneratedOutput from './components/GeneratedOutput.vue';
import CustomizableList from './components/CustomizableList.vue';
import SenseEditor from './components/SenseEditor.vue';
import SerializationModal from './components/SerializationModal.vue';
import SaveToImageButton from './components/Buttons/SaveToImageButton.vue';
import { Skill, Skills } from './enums/Skill';
import { DamageType, DamageTypes } from './enums/DamageType';
import { Condition, Conditions } from './enums/Conditions';
import { Trait } from './models/Trait';
import { ActionInput } from './models/ActionInput';
import MigrationUtilities from './services/MigrationUtilities';

export default defineComponent({
    name: 'App',
    components: {
        GeneratedOutput,
        ThreatCalculator,
        SenseEditor,
        CustomizableList,
        SerializationModal,
        SaveToImageButton
    },
    data() {
        return {
            name: 'Name',
            level: 1,
            rank: Rank.Grunt,
            threatLevel: 1,
            creatureType: 'Humanoid',
            armorIncludesDex: true,
            armorValue: 10,
            rankItems: [
                { value: Rank.Minion, text: 'Minion' },
                { value: Rank.Grunt, text: 'Grunt' },
                { value: Rank.Elite, text: 'Elite' },
                { value: Rank.Paragon, text: 'Paragon' }
            ],
            strAttr: AbilityLevel.High,
            dexAttr: AbilityLevel.High,
            conAttr: AbilityLevel.Medium,
            intAttr: AbilityLevel.Medium,
            wisAttr: AbilityLevel.Low,
            chaAttr: AbilityLevel.Low,
            attrItems: [
                { value: AbilityLevel.Low, text: 'Low' },
                { value: AbilityLevel.Medium, text: 'Medium' },
                { value: AbilityLevel.High, text: 'High' }
            ],
            selectedSaves: [],
            skills: [],
            skillItems: Skills,
            damageVulnerabilities: [],
            damageResistances: [],
            damageImmunities: [],
            damageItems: DamageTypes,
            conditionImmunities: [],
            conditionItems: Conditions,
            senses: [],
            traits: [],
            actions: [],
            hpMult: 1,
            acBonus: 0,
            dmgMult: 1,
            strMod: 0,
            dexMod: 0,
            conMod: 0,
            intMod: 0,
            wisMod: 0,
            chaMod: 0
        }
    },
    computed: {
        currentInput() {
            const curr = new InputData();
            curr.name = this.name;
            curr.level = +this.level;
            curr.rank = this.rank;
            curr.armor.armorBehavior = this.armorIncludesDex ? 'IncludeDex' : 'ExcludeDex';
            curr.armor.armorValue = +this.armorValue;
            curr.creatureType = this.creatureType;
            curr.strPref = this.strAttr;
            curr.dexPref = this.dexAttr;
            curr.conPref = this.conAttr;
            curr.intPref = this.intAttr;
            curr.wisPref = this.wisAttr;
            curr.chaPref = this.chaAttr;
            curr.threatLevel = this.threatLevel;
            curr.trainedSavingThrows = this.selectedSaves;
            curr.skills = this.skills;
            curr.damageVulnerabilities = this.damageVulnerabilities;
            curr.damageResistances = this.damageResistances;
            curr.damageImmunities = this.damageImmunities;
            curr.conditionImmunities = this.conditionImmunities;
            curr.senses = this.senses;
            curr.traits = this.traits;
            curr.hpMult = +this.hpMult;
            curr.acBonus = +this.acBonus;
            curr.dmgMult = +this.dmgMult;
            curr.actions = this.actions;
            curr.statMods = {
                strMod: +this.strMod,
                dexMod: +this.dexMod,
                conMod: +this.conMod,
                intMod: +this.intMod,
                wisMod: +this.wisMod,
                chaMod: +this.chaMod,
            };
            return curr;
        },
        currentInputJson() {
            return JSON.stringify(this.currentInput);
        },
        isThreatLevelDisabled() {
            return this.rank != Rank.Paragon;
        },
        numTrainedSavingThrows() {
            let baseSavingThrows = 1;
            switch (this.rank) {
                case Rank.Grunt:
                    baseSavingThrows = 2;
                    break;
                case Rank.Elite:
                case Rank.Paragon:
                    baseSavingThrows = 3;
                    break;
            }
            return baseSavingThrows;
        }
    },
    watch: {
        strAttr(a, b) {
            this.handleAbilityUpdate(Ability.Strength, a, b);
        },
        dexAttr(a, b) {
            this.handleAbilityUpdate(Ability.Dexterity, a, b);
        },
        conAttr(a, b) {
            this.handleAbilityUpdate(Ability.Constitution, a, b);
        },
        intAttr(a, b) {
            this.handleAbilityUpdate(Ability.Intelligence, a, b);
        },
        wisAttr(a, b) {
            this.handleAbilityUpdate(Ability.Wisdom, a, b);
        },
        chaAttr(a, b) {
            this.handleAbilityUpdate(Ability.Charisma, a, b);
        },
        rank(a: Rank) {
            switch (a) {
                case Rank.Minion:
                    this.threatLevel = 0.25;
                    break;
                case Rank.Grunt:
                    this.threatLevel = 1;
                    break;
                case Rank.Elite:
                    this.threatLevel = 2;
                    break;
            }
            this.updateSelectedSaves();
        },
        selectedSaves() {
            this.updateSelectedSaves();
        }
    },
    methods: {
        handleAbilityUpdate(attrToIgnore: Ability, valueToReplace: AbilityLevel, replacementValue: AbilityLevel) {
            if (this.areAbilitysBalanced()) {
                return;
            }

            if (attrToIgnore != Ability.Strength && this.strAttr == valueToReplace) {
                this.strAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Ability.Dexterity && this.dexAttr == valueToReplace) {
                this.dexAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Ability.Constitution && this.conAttr == valueToReplace) {
                this.conAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Ability.Intelligence && this.intAttr == valueToReplace) {
                this.intAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Ability.Wisdom && this.wisAttr == valueToReplace) {
                this.wisAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Ability.Charisma && this.chaAttr == valueToReplace) {
                this.chaAttr = replacementValue;
                return;
            }
        },
        areAbilitysBalanced() {
            return (this.strAttr + this.dexAttr + this.conAttr + this.intAttr + this.wisAttr + this.chaAttr == 6);
        },
        updateSelectedSaves() {
            while (this.selectedSaves.length > this.numTrainedSavingThrows) {
                this.selectedSaves.shift();
            }
        },
        onAddSense(sense: Sense) {
            (this.senses as Sense[]).push(sense);
        },
        onRemoveSense(sense: Sense) {
            const index = (this.senses as Sense[]).findIndex(x => x == sense);
            if (index >= 0) {
                this.senses.splice(index, 1);
            }
        },
        onSaveJson(json: string) {
            const newInput: InputData = MigrationUtilities.LoadJson(json);

            this.name = newInput.name;
            this.level = +newInput.level;
            this.rank = newInput.rank;
            this.strAttr = newInput.strPref;
            this.dexAttr = newInput.dexPref;
            this.conAttr = newInput.conPref;
            this.intAttr = newInput.intPref;
            this.wisAttr = newInput.wisPref;
            this.chaAttr = newInput.chaPref;
            this.threatLevel = newInput.threatLevel;
            (this.selectedSaves as string[]) = newInput.trainedSavingThrows;
            (this.skills as Skill[]) = newInput.skills;
            (this.damageVulnerabilities as DamageType[]) = newInput.damageVulnerabilities;
            (this.damageResistances as DamageType[]) = newInput.damageResistances;
            (this.damageImmunities as DamageType[]) = newInput.damageImmunities;
            (this.conditionImmunities as Condition[]) = newInput.conditionImmunities;
            this.senses = [];
            newInput.senses.forEach(x => (this.senses as Sense[]).push(new Sense(x.senseType, x.distance)));
            (this.traits as Trait[]) = newInput.traits;
            this.hpMult = +newInput.hpMult;
            this.acBonus = +newInput.acBonus;
            this.dmgMult = +newInput.dmgMult;
            (this.actions as ActionInput[]) = newInput.actions;
            this.strMod = +newInput.statMods.strMod;
            this.dexMod = +newInput.statMods.dexMod;
            this.conMod = +newInput.statMods.conMod;
            this.intMod = +newInput.statMods.intMod;
            this.wisMod = +newInput.statMods.wisMod;
            this.chaMod = +newInput.statMods.chaMod;

            this.armorIncludesDex = newInput.armor.armorBehavior == 'IncludeDex';
            this.armorValue = newInput.armor.armorValue;
        }
    }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
