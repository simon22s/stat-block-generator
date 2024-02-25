<template>
  <v-card v-if="currStatBlock">
      <v-container>
          <v-row>
              <v-col class="text-left">
                  <span>Name</span>
              </v-col>
          </v-row>
          <v-row>
              <BasicInfoSection :statBlock="currStatBlock">
              </BasicInfoSection>
          </v-row>
          <v-row>
              <AbilityScoreTable :statBlock="currStatBlock">
              </AbilityScoreTable>
          </v-row>
          <v-row>
              <ExtrasSection :statBlock="currStatBlock"></ExtrasSection>
          </v-row>
      </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputData from '../models/InputData';
import StatBlock from '../models/StatBlock';
import ExtrasSection from '../components/ExtrasSection.vue';
import BasicInfoSection from '../components/BasicInfoSection.vue';
import AbilityScoreTable from '../components/AbilityScoreTable.vue';

export default defineComponent({
  name: 'GeneratedOutput',
  props: {
      msg: String,
      inputData: {
          type: InputData,
          required: true
      }
    },
    components: {
        ExtrasSection,
        BasicInfoSection,
        AbilityScoreTable
    },
    computed: {
        currStatBlock(): StatBlock {
            return StatBlock.calcStatBlock(this.inputData);
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
</style>
