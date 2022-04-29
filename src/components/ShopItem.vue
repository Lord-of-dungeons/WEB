<template>
<v-card :loading="loading" class="mx-auto my-3" max-width="374" align="centerhy">
    <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="200" width="200" :src="API_URL.slice(0, -4) + itemPicture"></v-img>
    <div class="grey lighten-3">
        <v-card-text class="text-center text-body-1"><a @click="openDialogBuyArticle()">{{ itemName }}</a></v-card-text>
    </div>
    <v-divider class="mx-4"></v-divider>

    <v-card-text class="text-center text-body-1">{{ itemPrice }} 💎</v-card-text>

    <v-dialog id="DialogBuyArticle" v-model="DialogBuyArticleConfirm" max-width="600">
        <v-card align="center">
            <v-toolbar color="cPrimary2">Acheter des Diamz</v-toolbar>
            <v-img contain src="@/assets/placeholder.png" height="200"></v-img>
            <v-card-text class="text-body-2">Description de l'article ici</v-card-text>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script lang="ts">
// ANCHOR External imports
import Vue from "vue";
export default Vue.extend({
    name: "ShopItem",
    props: ["itemName", "itemPrice", "itemPicture"],

    data() {
        return {
            loading: false,
            selection: 1,
            API_URL: process.env.VUE_APP_API_URL,
            DialogBuyArticleConfirm: false,
        };
    },

    methods: {
        openDialogBuyArticle() {
            this.DialogBuyArticleConfirm = true;
        },
    },
});
</script>
