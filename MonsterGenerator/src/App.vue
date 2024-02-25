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
                            <v-expansion-panels>
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
import { CombatRole } from './enums/CombatRole';
import { AbilityLevel } from './enums/AbilityLevel';
import InputData from './models/InputData';
import ThreatCalculator from './components/ThreatCalculator.vue';
import GeneratedOutput from './components/GeneratedOutput.vue';

export default defineComponent({
    name: 'App',
    components: {
        GeneratedOutput,
        ThreatCalculator
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
            skillItems: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature'
               , 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival']
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
            curr.trainedSavingThrows = this.selectedSaves;
            curr.skills = this.skills;
            return curr;
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
        role() {
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
