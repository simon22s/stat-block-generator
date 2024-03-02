<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-card-text>
            <v-text-field v-model="traitName"></v-text-field>
            <v-text-field v-model="traitDesc"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn text="Cancel" @click="cancel"></v-btn>
            <v-btn :text="confirmText" @click="addTrait"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Trait } from '../models/Trait';

export default defineComponent({
  name: 'TraitEditor',
  props: {
      isAddingItem: {
          type: Boolean,
          required: true
      },
      existingItem: {
          type: Trait,
          required: false
      }
    },
    data() {
        return {
            traitName: !this.isAddingItem && this.existingItem ? this.existingItem!.name : '',
            traitDesc: !this.isAddingItem && this.existingItem ? this.existingItem!.description : ''
        }
    },
    computed: {
        cardTitle() {
            return this.isAddingItem ? 'Add New Trait' : 'Edit Trait';
        },
        confirmText() {
            return this.isAddingItem ? 'Add' : 'Save';
        }
    },
    methods: {
        addTrait() {
            if (this.isAddingItem) {
                this.$emit('addItem', {
                    name: this.traitName,
                    description: this.traitDesc
                });
            } else if (this.existingItem) {
                this.existingItem!.name = this.traitName;
                this.existingItem!.description = this.traitDesc;
            }
            this.$emit('closeEditor');
        },
        cancel() {
            this.$emit('closeEditor');
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
