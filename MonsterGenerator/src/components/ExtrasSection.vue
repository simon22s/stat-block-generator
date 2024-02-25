<template>
      <v-container>
          <v-row v-if="statBlock.trainedSavingThrows.length > 0">
              <span class="ml-1">Saving Throws</span>
              <span v-for="(savingThrow, index) in statBlock.trainedSavingThrows" 
                    :key="savingThrow"
                    class="ml-1">
              {{savingThrow}}{{index + 1 != statBlock.trainedSavingThrows.length ? ', ' : ''}}
              </span>
          </v-row>
          <v-row v-if="statBlock.skills.length > 0">
              <span class="ml-1">Skills</span>
              <span v-for="(skill, index) in statBlock.skills" 
                    :key="skill"
                    class="ml-1">
              {{skill}}{{index + 1 != statBlock.skills.length ? ', ' : ''}}
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
</style>
