<template>
    <v-container v-if="statBlock" class="px-0 py-4 border-t-md">
        <v-row>
            <v-col class="py-0 text-left">
                <span class="mr-1 font-weight-bold">Armor Class</span>
                <span>{{statBlock.armorClass}}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-0 text-left">
                <span class="mr-1 font-weight-bold">HP</span>
                <span>{{statBlock.hp}}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-0 text-left">
                <span class="mr-1 font-weight-bold">Speed</span>
                <span>{{statBlock.speed}} ft.</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-0 text-left">
                <span class="mr-1 font-weight-bold">Level</span>
                <span>{{statBlock.level}}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-0 text-left">
                <span class="mr-1 font-weight-bold">Recommended DMG Per Action</span>
                <span>{{statBlock.atkDamage}}</span>
            </v-col>
            <v-col class="py-0 text-right">
                <span class="mr-1 font-weight-bold">Proficiency Bonus</span>
                <span>+{{statBlock.profBonus}}</span>
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
