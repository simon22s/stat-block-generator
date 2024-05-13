<template>
    <v-container>
        <v-btn @click="openAddDialog"
               text="Add">
        </v-btn>
        <v-dialog v-model="isDialogOpen" max-width="500">
            <component v-bind:is="dialogComponent" :isAddingItem="currAddingItem" :existingItem="currItemToEdit" @addItem="onAddItem" @closeEditor="onDialogClosed"></component>
        </v-dialog>
        <v-row v-for="(item, index) in list" :key="index">
            <v-col cols="8">{{item.name}}</v-col>
            <v-col cols="2">
                <v-btn @click="openEditDialog(item)">
                    <v-icon end
                            icon="mdi-pencil"></v-icon>
                </v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn>
                    <v-icon end
                            icon="mdi-delete" @click="onRemoveItem(index)"></v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TraitEditor from './TraitEditor.vue';
import ActionEditor from './ActionEditor.vue';

export default defineComponent({
    name: 'CustomizableList',
    props: {
        shouldUseTraitEditor: {
            type: Boolean,
            required: true
        },
        list: {
            type: [],
            required: true
        }
    },
    components: {
        TraitEditor,
        ActionEditor
    },
    data() {
        return{
            isDialogOpen: false,
            currItemToEdit: null,
            currAddingItem: true
        }
    },
    computed: {
        dialogComponent() {
            return this.shouldUseTraitEditor ? TraitEditor : ActionEditor;
        }
    },
    methods: {
        onAddItem(item: any) {
            (this.list as any[]).push(item);
        },
        onRemoveItem(index: number) {
            (this.list as []).splice(index, 1);
        },
        openAddDialog() {
            this.currAddingItem = true;
            this.currItemToEdit = null;
            this.isDialogOpen = true;
        },
        openEditDialog(item: any) {
            this.currAddingItem = false;
            this.currItemToEdit = item;
            this.isDialogOpen = true;
        },
        onDialogClosed() {
            this.isDialogOpen = false;
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
