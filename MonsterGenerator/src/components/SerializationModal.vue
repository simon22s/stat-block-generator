<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in keyDirectory" :key="item.key">
                    <td>
                        {{item.displayName}}
                    </td>
                    <td>
                        {{item.date}}
                    </td>
                    <td>
                        <v-btn @click="loadData(item.key)"
                               icon="mdi-reload">
                        </v-btn>
                    </td>
                    <td>
                        <v-btn @click="overwriteData(item.key)"
                               icon="mdi-content-save-edit">
                        </v-btn>
                    </td>
                    <td>
                        <v-btn @click="deleteData(item.key)"
                               icon="mdi-delete">
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-card-actions>
            <v-btn text="Cancel" @click="cancel"></v-btn>
            <v-btn text="Save to New Slot" @click="saveData"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputData from '../models/InputData';
import SerializationUtilities from '../services/SerializationUtilities';

export default defineComponent({
  name: 'SerializationModal',
  props: {
      input: {
          type: InputData,
          required: true
      }
    },
    data() {
        return {
            keyDirectory: SerializationUtilities.getKeyDirectory()
        }
    },
    methods: {
        saveData() {
            SerializationUtilities.saveStatBlock(crypto.randomUUID(), this.input);
            this.keyDirectory = SerializationUtilities.getKeyDirectory();
        },
        overwriteData(key: string) {
            SerializationUtilities.saveStatBlock(key, this.input);
            this.keyDirectory = SerializationUtilities.getKeyDirectory();
        },
        loadData(key: string) {
            this.$emit('loadData', SerializationUtilities.getStatBlockFromLocalStorage(key));
            this.$emit('closeModal');
        },
        deleteData(key: string) {
            SerializationUtilities.removeStatBlockFromLocalStorage(key);
        },
        cancel() {
            this.$emit('closeModal');
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
