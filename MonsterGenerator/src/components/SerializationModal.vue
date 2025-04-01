<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-card-text>
            <v-textarea v-model="currJson"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn text="Cancel" @click="cancel"></v-btn>
            <v-btn text="Overwrite" @click="save"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SerializationModal',
  props: {
      inputJson: {
          type: String,
          required: true
      }
    },
    data() {
        return {
            currJson: this.inputJson
        }
    },
    methods: {
        save() {
            this.$emit('saveJson', this.currJson)
            this.$emit('closeModal');
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
