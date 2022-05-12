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
 
    <v-card-text class="text-center text-body-1" v-html="itemPriceString"></v-card-text>

</v-card>
</template>

<script lang="ts">
// ANCHOR External imports
import {
    bus
} from "@/main";
import Vue from "vue";
export default Vue.extend({
    name: "ShopItem",
    props: ["itemId", "itemDescription", "itemCategory", "itemName", "itemPrice", "itemPicture", "itemPromo"],
    components: {},
    data() {
        return {
            loading: false,
            selection: 1,
            API_URL: process.env.VUE_APP_API_URL,
            dialogBuyArticle: false,
            itemPriceString: ""
        };
    },

    methods: {
        openDialogBuyArticle() {
            const articlePicURL = this.API_URL.slice(0, -4) + this.itemPicture
            bus.$emit(
                "openDialogBuyArticle",
                this.itemId,
                this.itemDescription,
                this.itemCategory,
                this.itemName,
                this.itemPrice,
                articlePicURL,
            );
        },
    },
    created() {
        if (this.itemPromo > 0) {
            this.itemPriceString = "<i class = 'strike'>" + this.itemPrice.toString() + "</i> " + this.itemPromo + "💎" 
        }
        else {
            this.itemPriceString = this.itemPrice.toString() + "💎"
        }
    }
});
</script>

<style>

.strike {
    text-decoration:line-through;
    color: red;
}
</style>