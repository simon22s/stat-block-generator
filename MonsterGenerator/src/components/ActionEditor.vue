<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-card-text>
            <v-radio-group v-model="actionType">
                <v-radio label="Attack" value="Attack"></v-radio>
                <v-radio label="General" value="General"></v-radio>
            </v-radio-group>
            <v-text-field v-model="actionName"></v-text-field>
            <v-combobox v-if="isAttackAction" v-model="attackStat" :items="attackStatItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
            <v-radio-group v-if="isAttackAction" v-model="attackRange">
                <v-radio label="Melee" value="Melee"></v-radio>
                <v-radio label="Ranged" value="Ranged"></v-radio>
            </v-radio-group>
            <v-radio-group v-if="isAttackAction" v-model="attackType">
                <v-radio label="Weapon" value="Weapon"></v-radio>
                <v-radio label="Spell" value="Spell"></v-radio>
            </v-radio-group>
            <v-text-field v-if="isAttackAction" v-model="range" type="number" hide-details>
            </v-text-field>
            <v-checkbox v-if="isAttackAction" v-model="isProficient" label="Is Proficient"></v-checkbox>
            <v-combobox v-if="isAttackAction" v-model="damageType" :items="damageItems"></v-combobox>
            <v-text-field v-model="effectText"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn text="Cancel" @click="cancel"></v-btn>
            <v-btn :text="confirmText" @click="addTrait"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActionInput, AttackActionInput } from '../models/ActionInput';
import { ActionTimes } from '../enums/ActionTime';
import { Ability } from '../enums/Ability';
import { DamageTypes } from '../enums/DamageType';

export default defineComponent({
  name: 'ActionEditor',
  props: {
      isAddingItem: {
          type: Boolean,
          required: true
      },
      existingItem: {
          type: ActionInput,
          required: false
      }
    },
    data() {
        return {
            actionType: !this.isAddingItem && this.existingItem ? this.existingItem!.actionType : 'Attack',
            actionName: !this.isAddingItem && this.existingItem ? this.existingItem!.name : '',
            actionTime: !this.isAddingItem && this.existingItem ? this.existingItem!.actionTime : 'Action',
            actionTimes: ActionTimes,
            effectText: !this.isAddingItem && this.existingItem ? this.existingItem!.effectText : '',
            attackStat: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).attackStat : Ability.Strength,
            attackRange: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).attackRange : 'Melee',
            attackType: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).attackType : 'Weapon',
            range: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).range : 5,
            isProficient: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).isProficient : true,
            damageType: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).damageType : 'Bludgeoning',
            attackStatItems: [
                { value: Ability.Strength, text: 'Strength' },
                { value: Ability.Dexterity, text: 'Dexterity' },
                { value: Ability.Constitution, text: 'Constitution' },
                { value: Ability.Intelligence, text: 'Intelligence' },
                { value: Ability.Wisdom, text: 'Wisdom' },
                { value: Ability.Charisma, text: 'Charisma' },
            ],
            damageItems: DamageTypes,
        }
    },
    computed: {
        isAttackAction() {
            return this.actionType == 'Attack';
        },
        cardTitle() {
            return this.isAddingItem ? 'Add New Action' : 'Edit Action';
        },
        confirmText() {
            return this.isAddingItem ? 'Add' : 'Save';
        }
    },
    methods: {
        addTrait() {
            if (this.isAddingItem) {
                if (this.actionType == 'Attack') {
                    this.$emit('addItem', {
                        actionType: this.actionType,
                        name: this.actionName,
                        actionTime: this.actionTime,
                        effectText: this.effectText,
                        attackStat: this.attackStat,
                        attackRange: this.attackRange,
                        attackType: this.attackType,
                        range: this.range,
                        isProficient: this.isProficient,
                        damageType: this.damageType,
                    });
                } else {
                    this.$emit('addItem', {
                        actionType: this.actionType,
                        name: this.actionName,
                        actionTime: this.actionTime,
                        effectText: this.effectText,
                    });
                }
            } else if (this.existingItem) {
                this.existingItem!.actionType = this.actionType;
                this.existingItem!.name = this.actionName;
                this.existingItem!.actionTime = this.actionTime;
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
