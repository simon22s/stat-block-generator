<template>
      <v-container v-if="featuresList.length > 0">
          <v-row v-if="sectionName != ''">
            <p class="text-h6">{{sectionName}}</p>
          </v-row>
          <v-row v-for="feature in featuresList" :key="feature">
                <p v-html="feature.htmlText" class="text-left"></p>
          </v-row>
          
      </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FeaturesSection',
  props: {
      sectionName: {
          type: String,
          required: false,
          default: ''
      },
      featuresList: {
          type: [],
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
