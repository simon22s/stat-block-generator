<template>
      <v-container  class="py-4 border-t-md use-separator-color">
          <v-row v-if="statBlock.trainedSavingThrows.length > 0">
              <span class="mr-1 font-weight-bold">Saving Throws</span>
              <span v-for="(savingThrow, index) in statBlock.trainedSavingThrows" 
                    :key="savingThrow"
                    class="mr-1">
              {{savingThrow}}{{index + 1 != statBlock.trainedSavingThrows.length ? ', ' : ''}}
              </span>
          </v-row>
          <v-row v-if="statBlock.skills.length > 0">
              <span class="mr-1 font-weight-bold">Skills</span>
              <span v-for="(skill, index) in statBlock.skills" 
                    :key="skill"
                    class="mr-1">
              {{skill}}{{index + 1 != statBlock.skills.length ? ', ' : ''}}
              </span>
          </v-row>
          <v-row v-if="statBlock.damageVulnerabilities.length > 0">
              <span class="mr-1 font-weight-bold">Damage Vulnerabilities</span>
              <span v-for="(damageVuln) in statBlock.damageVulnerabilities"
                    :key="damageVuln"
                    class="mr-1">
                  {{damageVuln}}
              </span>
          </v-row>
          <v-row v-if="statBlock.damageResistances.length > 0">
              <span class="mr-1 font-weight-bold">Damage Resistances</span>
              <span v-for="(damageRes) in statBlock.damageResistances"
                    :key="damageRes"
                    class="mr-1">
                  {{damageRes}}
              </span>
          </v-row>
          <v-row v-if="statBlock.damageImmunities.length > 0">
              <span class="mr-1 font-weight-bold">Damage Immunities</span>
              <span v-for="(damageImm) in statBlock.damageImmunities"
                    :key="damageImm"
                    class="mr-1">
                  {{damageImm}}
              </span>
          </v-row>
          <v-row v-if="statBlock.conditionImmunities.length > 0">
              <span class="mr-1 font-weight-bold">Condition Immunities</span>
              <span v-for="(condition, index) in statBlock.conditionImmunities"
                    :key="condition"
                    class="mr-1">
                  {{condition.toLowerCase()}}{{index + 1 != statBlock.conditionImmunities.length ? ', ' : ''}}
              </span>
          </v-row>
          <v-row v-if="statBlock.senses.length > 0">
              <span class="mr-1 font-weight-bold">Senses</span>
              <span v-for="(sense, index) in statBlock.senses"
                    :key="sense"
                    class="mr-1">
                  {{sense.toLowerCase()}}{{index + 1 != statBlock.senses.length ? ', ' : ''}}
              </span>
          </v-row>
      </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatBlock from '../models/StatBlock';

export default defineComponent({
  name: 'ExtrasSection',
  props: {
      msg: String,
      statBlock: {
          type: StatBlock,
          required: true
      }
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

.use-separator-color {
    border-color: rgb(var(--v-theme-separatorColor)) !important;
}
</style>
