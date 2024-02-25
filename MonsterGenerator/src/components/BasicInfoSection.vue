<template>
      <v-container v-if="statBlock">
            <v-row>
                <v-col class="text-left">
                    <span>Level {{statBlock.level}}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-left">
                    <span>Armor Class: </span>
                    <span>{{statBlock.armorClass}}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-left">
                    <span>HP: </span>
                    <span>{{statBlock.hp}}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-left">
                    <span>Speed: </span>
                    <span>{{statBlock.speed}} ft.</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-left">
                    <span>Average DMG Per Action: </span>
                    <span>{{statBlock.atkDamage}}</span>
                </v-col>
            </v-row>
      </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatBlock from '../models/StatBlock';

export default defineComponent({
  name: 'BasicInfoSection',
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
