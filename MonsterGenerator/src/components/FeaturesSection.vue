<template>
      <v-container v-if="featuresList.length > 0">
          <v-row class="section-name border-b-sm use-separator-color">
            <p v-if="sectionName != ''" class="text-h6">{{sectionName}}</p>
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
.section-name{
    font-variant: small-caps;
}

.use-separator-color {
    border-color: rgb(var(--v-theme-separatorColor)) !important;
}

p.text-h6{
    font-family: "Montserrat", sans-serif !important;
}
</style>
