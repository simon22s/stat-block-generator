<template>
    <v-app>
        <div class="d-flex align-center flex-column">
            <v-card width="50%" class="pa-8 mb-8">
                <v-row>
                    <v-col class="d-flex">
                        <v-text-field v-model="partySize" type="number"></v-text-field>
                        <span> Players of Level </span>
                        <v-text-field v-model="partyLevel" type="number"></v-text-field>
                    </v-col>
                    <v-col>
                        <span>Threat Budget: {{threatBudget}}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex">
                        <span>
                            Encounter Difficulty:
                        </span>
                        <v-combobox v-model="encounterDiff" :items="['Trivial', 'Easy', 'Normal', 'Hard', 'Extreme']">
                        </v-combobox>
                    </v-col>
                    <v-col>
                        <span>The current creature has an adjusted Threat Level of {{adjustedThreatLevel}}</span>
                    </v-col>
                </v-row>
            </v-card>
            <v-card width="80%" class="pa-8">
                <v-row>
                    <v-col cols="8">
                        <v-container>
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
                                    <span>Role</span>
                                    <v-combobox v-model="role" :items="roleItems" item-value="value" item-title="text" :return-object="false">
                                    </v-combobox>
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
                            <v-row>
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th class="text-center">
                                                STR
                                            </th>
                                            <th class="text-center">
                                                DEX
                                            </th>
                                            <th class="text-center">
                                                CON
                                            </th>
                                            <th class="text-center">
                                                INT
                                            </th>
                                            <th class="text-center">
                                                WIS
                                            </th>
                                            <th class="text-center">
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
                            </v-row>
                            <v-row>
                                <v-container>
                                    <span>Trained Saving Throws</span>
                                    
                                    <v-checkbox label="Strength"></v-checkbox>
                                </v-container>
                            </v-row>
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
import { Attribute } from './enums/Attribute';
import { Rank } from './enums/Rank';
import { CombatRole } from './enums/CombatRole';
import { AttributePreference } from './enums/AttributePreferences';
import InputData from './models/InputData';
import ThreatCalculator, { EncounterDifficulty } from './services/ThreatCalculator';
import GeneratedOutput from './components/GeneratedOutput.vue';

export default defineComponent({
    name: 'App',
    components: {
        GeneratedOutput,
    },
    data() {
        return {
            level: 1,
            rank: Rank.Grunt,
            threatLevel: 1,
            rankItems: [
                { value: Rank.Minion, text: 'Minion' },
                { value: Rank.Grunt, text: 'Grunt' },
                { value: Rank.Elite, text: 'Elite' },
                { value: Rank.Paragon, text: 'Paragon' }
            ],
            role: CombatRole.None,
            roleItems: [
                { value: CombatRole.None, text: 'None' },
                { value: CombatRole.Controller, text: 'Controller' },
                { value: CombatRole.Defender, text: 'Defender' },
                { value: CombatRole.Lurker, text: 'Lurker' },
                { value: CombatRole.Skirmisher, text: 'Skirmisher' },
                { value: CombatRole.Striker, text: 'Striker' },
                { value: CombatRole.Supporter, text: 'Supporter' },
            ],
            strAttr: AttributePreference.High,
            dexAttr: AttributePreference.High,
            conAttr: AttributePreference.Medium,
            intAttr: AttributePreference.Medium,
            wisAttr: AttributePreference.Low,
            chaAttr: AttributePreference.Low,
            attrItems: [
                { value: AttributePreference.Low, text: 'Low' },
                { value: AttributePreference.Medium, text: 'Medium' },
                { value: AttributePreference.High, text: 'High' }
            ],
            selectedSaves: [],
            encounterDiff: 'Normal',
            partySize: 1,
            partyLevel: 1
        }
    },
    computed: {
        currentInput() {
            const curr = new InputData();
            curr.level = this.level;
            curr.role = this.role;
            curr.rank = this.rank;
            curr.strPref = this.strAttr;
            curr.dexPref = this.dexAttr;
            curr.conPref = this.conAttr;
            curr.intPref = this.intAttr;
            curr.wisPref = this.wisAttr;
            curr.chaPref = this.chaAttr;
            curr.threatLevel = this.threatLevel;
            return curr;
        },
        isThreatLevelDisabled() {
            return this.rank != Rank.Paragon;
        },
        threatBudget() {
            return ThreatCalculator.calcThreatBudget(this.partySize, this.encounterDiff as EncounterDifficulty);
        },
        adjustedThreatLevel() {
            return ThreatCalculator.calcAdjustedThreatLevel(this.level, this.threatLevel, this.partyLevel);
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
            switch (this.role) {
                case CombatRole.Defender:
                    baseSavingThrows += 1;
                    break;
                case CombatRole.Lurker:
                    baseSavingThrows -= 1;
                    break;
            }
            return baseSavingThrows;
        }
    },
    watch: {
        strAttr(a, b) {
            this.handleAttributeUpdate(Attribute.Strength, a, b);
        },
        dexAttr(a, b) {
            this.handleAttributeUpdate(Attribute.Dexterity, a, b);
        },
        conAttr(a, b) {
            this.handleAttributeUpdate(Attribute.Constitution, a, b);
        },
        intAttr(a, b) {
            this.handleAttributeUpdate(Attribute.Intelligence, a, b);
        },
        wisAttr(a, b) {
            this.handleAttributeUpdate(Attribute.Wisdom, a, b);
        },
        chaAttr(a, b) {
            this.handleAttributeUpdate(Attribute.Charisma, a, b);
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
        role() {
            this.updateSelectedSaves();
        },
        selectedSaves() {
            this.updateSelectedSaves();
        }
    },
    methods: {
        handleAttributeUpdate(attrToIgnore: Attribute, valueToReplace: AttributePreference, replacementValue: AttributePreference) {
            if (this.areAttributesBalanced()) {
                return;
            }

            if (attrToIgnore != Attribute.Strength && this.strAttr == valueToReplace) {
                this.strAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Attribute.Dexterity && this.dexAttr == valueToReplace) {
                this.dexAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Attribute.Constitution && this.conAttr == valueToReplace) {
                this.conAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Attribute.Intelligence && this.intAttr == valueToReplace) {
                this.intAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Attribute.Wisdom && this.wisAttr == valueToReplace) {
                this.wisAttr = replacementValue;
                return;
            }
            if (attrToIgnore != Attribute.Charisma && this.chaAttr == valueToReplace) {
                this.chaAttr = replacementValue;
                return;
            }
        },
        areAttributesBalanced() {
            return (this.strAttr + this.dexAttr + this.conAttr + this.intAttr + this.wisAttr + this.chaAttr == 6);
        },
        updateSelectedSaves() {
            while (this.selectedSaves.length > this.numTrainedSavingThrows) {
                this.selectedSaves.shift();
            }
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
