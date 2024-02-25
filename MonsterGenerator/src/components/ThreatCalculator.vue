<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThreatCalculator, { EncounterDifficulty } from '../services/ThreatCalculator';

export default defineComponent({
  name: 'ThreatCalculator',
  props: {
      level: {
          type: Number,
          required: true
      },
      threatLevel: {
          type: Number,
          required: true
      }
    },
    data() {
        return {
            encounterDiff: 'Normal',
            partySize: 1,
            partyLevel: 1,
        }
    },
    computed: {
        threatBudget() {
            return ThreatCalculator.calcThreatBudget(this.partySize, this.encounterDiff as EncounterDifficulty);
        },
        adjustedThreatLevel() {
            return ThreatCalculator.calcAdjustedThreatLevel(this.level, this.threatLevel, this.partyLevel);
        },
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
