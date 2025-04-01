<template>
    <v-btn @click="save">
        <v-icon icon="mdi-image"></v-icon>
        </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as htmlToImage from "html-to-image";

export default defineComponent({
  name: 'SaveToImageButton',
    methods: {
        save() {
            htmlToImage
                .toBlob(document.getElementById("generated-stat-block")!)
                .then(function (blob) {
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob!);
                    a.download = "screenshot.png";
                    a.click();
                });
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
