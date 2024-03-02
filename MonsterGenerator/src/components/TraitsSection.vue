<template>
      <v-container v-if="statBlock.traits.length > 0">
          <v-row v-for="trait in statBlock.traits" :key="trait">
                <b class="mr-1">{{trait.name}}</b>
                <p v-html="trait.htmlText"></p>
          </v-row>
          
      </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatBlock from '../models/StatBlock';

export default defineComponent({
  name: 'TraitsSection',
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
