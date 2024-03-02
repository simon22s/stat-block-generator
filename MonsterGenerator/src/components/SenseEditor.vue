<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-card-text>
            <v-combobox v-model="senseType" :items="senseItems"></v-combobox>
            <v-text-field v-if="senseType == 'Custom'" v-model="customSenseType"></v-text-field>
            <v-text-field v-model="distance" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn text="Cancel" @click="cancel"></v-btn>
            <v-btn :text="confirmText" @click="addSense"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SenseTypes } from '../enums/SenseType';
import { Sense } from '../models/Sense';

export default defineComponent({
  name: 'SenseEditor',
  props: {
      isAddingSense: {
          type: Boolean,
          required: true
      },
      existingSense: {
          type: Sense,
          required: false
      }
    },
    data() {
        let senseType = 'Darkvision';
        let customSenseType = '';
        let distance = 30;

        if (!this.isAddingSense && this.existingSense) {
            const isCustom = SenseTypes.findIndex(x => x == this.existingSense!.senseType) < 0;
            if (isCustom) {
                senseType = 'Custom';
                customSenseType = this.existingSense.senseType;
            } else {
                senseType = this.existingSense.senseType;
            }
            distance = this.existingSense.distance;
        }
        return {
            senseType: senseType,
            customSenseType: customSenseType,
            senseItems: SenseTypes,
            distance: distance
        }
    },
    computed: {
        cardTitle(){
            return this.isAddingSense ? 'Add New Sense' : 'Edit Sense';
        },
        confirmText(){
            return this.isAddingSense ? 'Add' : 'Save';
        }
    },
    methods: {
        addSense() {
            if (this.isAddingSense) {
                const sense = new Sense();
                sense.senseType = this.senseType != 'Custom' ? this.senseType : this.customSenseType;
                sense.distance = this.distance;
                this.$emit('addSense', sense);
            } else if (this.existingSense){
                this.existingSense!.senseType = this.senseType != 'Custom' ? this.senseType : this.customSenseType;
                this.existingSense!.distance = this.distance;
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
