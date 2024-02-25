<template>
  <v-card v-if="currStatBlock">
      <v-container>
          <v-row>
              <v-col class="text-left">
                  <span>Name</span>
              </v-col>
          </v-row>
          <v-row>
              <v-col class="text-left">
                  <span>Level {{currStatBlock.level}}</span>
              </v-col>
          </v-row>
          <v-row>
              <v-col class="text-left">
                  <span>Armor Class: </span>
                  <span>{{currStatBlock.armorClass}}</span>
              </v-col>
          </v-row>
          <v-row>
              <v-col class="text-left">
                  <span>HP: </span>
                  <span>{{currStatBlock.hp}}</span>
              </v-col>
          </v-row>
          <v-row>
              <v-col class="text-left">
                  <span>Speed: </span>
                  <span>{{currStatBlock.speed}}</span>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <v-table>
                      <thead>
                          <tr>
                              <th class="text-center">
                                  STR
                              </th>
                              <th class="text-center">
                                  DEX
                              </th>
                              <th class="text-center">
                                  CON
                              </th>
                              <th class="text-center">
                                  INT
                              </th>
                              <th class="text-center">
                                  WIS
                              </th>
                              <th class="text-center">
                                  CHA
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>
                                  {{calcTotalStatForStatMod(currStatBlock.strMod)}} ({{currStatBlock.strMod}})
                              </td>
                              <td>
                                  {{calcTotalStatForStatMod(currStatBlock.dexMod)}} ({{currStatBlock.dexMod}})
                              </td>
                              <td>
                                  {{calcTotalStatForStatMod(currStatBlock.conMod)}} ({{currStatBlock.conMod}})
                              </td>
                              <td>
                                  {{calcTotalStatForStatMod(currStatBlock.intMod)}} ({{currStatBlock.intMod}})
                              </td>
                              <td>
                                  {{calcTotalStatForStatMod(currStatBlock.wisMod)}} ({{currStatBlock.wisMod}})
                              </td>
                              <td>
                                  {{calcTotalStatForStatMod(currStatBlock.chaMod)}} ({{currStatBlock.chaMod}})
                              </td>
                          </tr>
                      </tbody>
                  </v-table>
              </v-col>
          </v-row>
      </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputData from '../models/InputData';
import StatBlock from '../models/Monster';

export default defineComponent({
  name: 'GeneratedOutput',
  props: {
      msg: String,
      inputData: {
          type: InputData,
          required: true
      }
    },
    computed: {
        currStatBlock() {
            return StatBlock.calcStatBlock(this.inputData);
        }
    },
    methods: {
        calcTotalStatForStatMod(statMod: number) {
            return 10 + (statMod * 2);
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
