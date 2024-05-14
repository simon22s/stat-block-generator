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
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.traits"></FeaturesSection>
          </v-row>
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.actions" :sectionName="Actions"></FeaturesSection>
          </v-row>
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.bonusActions" :sectionName="BonusActions"></FeaturesSection>
          </v-row>
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.reactions" :sectionName="Reactions"></FeaturesSection>
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
import FeaturesSection from '../components/FeaturesSection.vue';

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
        AbilityScoreTable,
        FeaturesSection
    },
    computed: {
        currStatBlock(): StatBlock {
            return new StatBlock(this.inputData);
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
