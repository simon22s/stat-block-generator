<template>
  <v-card v-if="currStatBlock" class="stat-block-card">
      <v-container>
          <v-row>
              <v-col class="text-left pa-0">
                  <span class="stat-block-name">{{currStatBlock.name}}</span>
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
              <FeaturesSection :featuresList="currStatBlock.actions" :sectionName="'Actions'"></FeaturesSection>
          </v-row>
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.bonusActions" :sectionName="'Bonus Actions'"></FeaturesSection>
          </v-row>
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.reactions" :sectionName="'Reactions'"></FeaturesSection>
          </v-row>
          <v-row>
              <FeaturesSection :featuresList="currStatBlock.villainActions" :sectionName="'Villain Actions'"></FeaturesSection>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
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
.stat-block-card{
    background-color: #fce5cd;
    font-family: "Montserrat", sans-serif !important;
    padding: 0;
}
.stat-block-name{
    font-variant: small-caps;
    font-size: 32px;
    font-weight: 700;
}
</style>
