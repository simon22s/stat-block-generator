<template>
      <v-container>
          <v-row>
              <span class="ml-2">Saving Throws</span>
              <span v-for="(savingThrow, index) in statBlock.trainedSavingThrows" 
                    :key="savingThrow"
                    class="ml-2">
              {{savingThrow}}{{index + 1 != statBlock.trainedSavingThrows.length ? ', ' : ''}}
              </span>
          </v-row>
      </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatBlock from '../models/Monster';

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
