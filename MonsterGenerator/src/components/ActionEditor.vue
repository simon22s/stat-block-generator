<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-card-text>
            <v-radio-group v-model="actionType">
                <v-radio label="Attack" value="Attack"></v-radio>
                <v-radio label="General" value="General"></v-radio>
            </v-radio-group>
            <v-text-field v-model="actionName"></v-text-field>
            <v-combobox v-model="actionTime" :items="actionTimes"></v-combobox>
            <v-combobox v-if="isAttackAction" v-model="attackStat" :items="attackStatItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
            <v-radio-group v-if="isAttackAction" v-model="attackRange">
                <v-radio label="Melee" value="Melee"></v-radio>
                <v-radio label="Ranged" value="Ranged"></v-radio>
            </v-radio-group>
            <v-radio-group v-if="isAttackAction" v-model="attackType">
                <v-radio label="Weapon" value="Weapon"></v-radio>
                <v-radio label="Spell" value="Spell"></v-radio>
            </v-radio-group>
            <v-text-field v-if="isAttackAction" v-model="range" type="number" :step="5" hide-details>
            </v-text-field>
            <v-checkbox v-if="isAttackAction" v-model="isProficient" label="Is Proficient"></v-checkbox>
            <v-text-field v-if="isAttackAction" v-model="damageMult" type="number" :step="0.01" hide-details>
            </v-text-field>
            <v-combobox v-if="isAttackAction" v-model="damageType" :items="damageItems"></v-combobox>
            <v-textarea v-model="effectText"></v-textarea>
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
            damageMult: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).damageMult : 1,
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
                        damageMult: this.damageMult,
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
                this.existingItem!.effectText = this.effectText;

                if (this.actionType == 'Attack') {
                    (this.existingItem! as AttackActionInput).attackStat = this.attackStat;
                    (this.existingItem! as AttackActionInput).attackRange = this.attackRange;
                    (this.existingItem! as AttackActionInput).attackType = this.attackType;
                    (this.existingItem! as AttackActionInput).range = this.range;
                    (this.existingItem! as AttackActionInput).isProficient = this.isProficient;
                    (this.existingItem! as AttackActionInput).damageMult = this.damageMult;
                    (this.existingItem! as AttackActionInput).damageType = this.damageType;
                }
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
