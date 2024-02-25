<template>
    <v-container v-if="statBlock">
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
                        {{calcTotalStatForStatMod(statBlock.strMod)}} ({{statBlock.strMod}})
                    </td>
                    <td>
                        {{calcTotalStatForStatMod(statBlock.dexMod)}} ({{statBlock.dexMod}})
                    </td>
                    <td>
                        {{calcTotalStatForStatMod(statBlock.conMod)}} ({{statBlock.conMod}})
                    </td>
                    <td>
                        {{calcTotalStatForStatMod(statBlock.intMod)}} ({{statBlock.intMod}})
                    </td>
                    <td>
                        {{calcTotalStatForStatMod(statBlock.wisMod)}} ({{statBlock.wisMod}})
                    </td>
                    <td>
                        {{calcTotalStatForStatMod(statBlock.chaMod)}} ({{statBlock.chaMod}})
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatBlock from '../models/Monster';

export default defineComponent({
  name: 'BasicInfoSection',
  props: {
      msg: String,
      statBlock: {
          type: StatBlock,
          required: true
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
