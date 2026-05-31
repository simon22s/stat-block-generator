<template>
    <v-card class="pa-8 mb-8" :title="cardTitle">
        <v-card-text>
            <v-radio-group v-model="actionType">
                <v-radio label="Attack" value="Attack"></v-radio>
                <v-radio label="General" value="General"></v-radio>
            </v-radio-group>
            <v-text-field v-model="actionName" label="Name"></v-text-field>
            <v-combobox v-model="actionTime" label="Action Time" :items="actionTimes"></v-combobox>
            <div v-if="isAttackAction">
                <v-combobox v-model="attackStat" label="Ability to Use" :items="attackStatItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                <v-radio-group v-model="attackRange">
                    <v-radio label="Melee" value="Melee"></v-radio>
                    <v-radio label="Ranged" value="Ranged"></v-radio>
                </v-radio-group>
                <v-radio-group v-model="attackType">
                    <v-radio label="Weapon" value="Weapon"></v-radio>
                    <v-radio label="Spell" value="Spell"></v-radio>
                </v-radio-group>
                <v-text-field v-if="isMeleeAttack" v-model="reach" label="Reach" type="number" :step="5" hide-details>
                </v-text-field>
                <v-text-field v-if="!isMeleeAttack" v-model="closeRange" label="Close Range" type="number" :step="5" hide-details>
                </v-text-field>
                <v-text-field v-if="!isMeleeAttack" v-model="farRange" label="Far Range" type="number" :step="5" hide-details>
                </v-text-field>
                <v-checkbox v-model="isProficient" label="Is Proficient"></v-checkbox>
                <v-text-field v-model="damageMult" label="Damage Multiplier" type="number" :step="0.01" hide-details>
                </v-text-field>
                <v-combobox v-model="damageType" :items="damageItems"></v-combobox>
            </div>
            <v-textarea v-model="effectText" label="Additional Effect"></v-textarea>
            <v-btn v-if="!hasSavingThrow" @click="addSavingThrow">
                Add Saving Throw
            </v-btn>
            <div v-else>
                <v-combobox v-model="savingThrow.savingThrowType" label="Saving Throw Type" :items="attackStatItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                <v-combobox v-model="savingThrow.abilityModifier" label="Ability Modifier for DC" :items="attackStatItems" item-value="value" item-title="text" :return-object="false"></v-combobox>
                <v-text-field v-model="savingThrow.targetDescription" label="Target Description"></v-text-field>
                <v-text-field v-model="savingThrow.successDescription" label="On Success"></v-text-field>
                <v-text-field v-model="savingThrow.failureDescription" label="On Failure"></v-text-field>
            </div>
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
import { DamageInstance } from '../models/DamageInstance';
import { SavingThrowEffect } from '../models/SavingThrowEffect';

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
            reach: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).reach : 5,
            closeRange: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).closeRange : 60,
            farRange: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).farRange : 120,
            isProficient: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).isProficient : true,
            damageMult: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).baseDamage.damageMult : 1,
            damageType: !this.isAddingItem && this.existingItem && this.existingItem.actionType == 'Attack' ? (this.existingItem! as AttackActionInput).baseDamage.damageType : 'Bludgeoning',
            attackStatItems: [
                { value: Ability.Strength, text: 'Strength' },
                { value: Ability.Dexterity, text: 'Dexterity' },
                { value: Ability.Constitution, text: 'Constitution' },
                { value: Ability.Intelligence, text: 'Intelligence' },
                { value: Ability.Wisdom, text: 'Wisdom' },
                { value: Ability.Charisma, text: 'Charisma' },
            ],
            damageItems: DamageTypes,
            savingThrow: null as SavingThrowEffect | null,
        }
    },
    computed: {
        isAttackAction() {
            return this.actionType == 'Attack';
        },
        isMeleeAttack() {
            return this.attackRange == 'Melee';
        },
        hasSavingThrow() {
            return this.savingThrow != null;
        },
        cardTitle() {
            return this.isAddingItem ? 'Add New Action' : 'Edit Action';
        },
        confirmText() {
            return this.isAddingItem ? 'Add' : 'Save';
        }
    },
    methods: {
        addSavingThrow() {
            this.savingThrow = new SavingThrowEffect();
        },
        addTrait() {
            if (this.isAddingItem) {
                let outputSavingThrow: SavingThrowEffect | null = null;
                if (this.hasSavingThrow) {
                    outputSavingThrow = new SavingThrowEffect();
                    outputSavingThrow.savingThrowType = this.savingThrow!.savingThrowType;
                    outputSavingThrow.abilityModifier = this.savingThrow!.abilityModifier;
                    outputSavingThrow.targetDescription = this.savingThrow!.targetDescription;
                    outputSavingThrow.successDescription = this.savingThrow!.successDescription;
                    outputSavingThrow.failureDescription = this.savingThrow!.failureDescription;
                }
                if (this.actionType == 'Attack') {
                    this.$emit('addItem', {
                        actionType: this.actionType,
                        name: this.actionName,
                        actionTime: this.actionTime,
                        effectText: this.effectText,
                        attackStat: this.attackStat,
                        attackRange: this.attackRange,
                        attackType: this.attackType,
                        reach: this.reach,
                        closeRange: this.closeRange,
                        farRange: this.farRange,
                        isProficient: this.isProficient,
                        baseDamage: new DamageInstance(this.damageType, this.damageMult),
                        bonusDamages: [],
                        savingThrowEffect: this.savingThrow,
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
                this.existingItem!.savingThrowEffect = this.savingThrow;

                if (this.actionType == 'Attack') {
                    (this.existingItem! as AttackActionInput).attackStat = this.attackStat;
                    (this.existingItem! as AttackActionInput).attackRange = this.attackRange;
                    (this.existingItem! as AttackActionInput).attackType = this.attackType;
                    (this.existingItem! as AttackActionInput).reach = this.reach;
                    (this.existingItem! as AttackActionInput).closeRange = this.closeRange;
                    (this.existingItem! as AttackActionInput).farRange = this.farRange;
                    (this.existingItem! as AttackActionInput).isProficient = this.isProficient;
                    (this.existingItem! as AttackActionInput).baseDamage.damageMult = this.damageMult;
                    (this.existingItem! as AttackActionInput).baseDamage.damageType = this.damageType;
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
