<template>
<v-dialog id="DialogBuyDiamz" v-model="dialogConfirm" max-width="600">
    <v-card align="center">
        <v-toolbar color="cPrimary2">Acheter des Diamz</v-toolbar>
        <v-img contain src="@/assets/placeholder.png" height="200"></v-img>
        <v-card-text class="text-body-2">Description des diamz ici</v-card-text>
        <v-card-actions class="justify-center">
            <v-text-field class="shrink mb-0 mt-0 ma-2" solo v-model="amountDiamz" type="number" @change="changeDiamz"></v-text-field>
            <v-card-text class="text-body-1">Diamz --></v-card-text>
            <v-text-field class="shrink mb-0 mt-0 ma-2" solo v-model="amountEuro" type="number" @change="changeEuro"></v-text-field>
            <v-card-text class="text-body-1">Euro</v-card-text>
        </v-card-actions>
        <v-card-actions class="justify-center">
            <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="openDialogPayment()">Acheter</v-btn>
        </v-card-actions>
    </v-card>

    <dialog-payment />
</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {
    bus
} from "@/main";
import axios from "axios";
const API_URL = process.env.VUE_APP_API_URL as string;
export default Vue.extend({
    name: "DialogBuyDiamz",
    components: {
        Alert: () => import("@/components/Alert.vue"),
        DialogPayment: () => import("@/components/DialogPayment.vue"),
    },
    data() {
        return {
            token: localStorage.getItem("token") || "",
            dialogConfirm: false,
            amountDiamz: 100,
            amountEuro: 1
        };
    },
    methods: {
        openDialogPayment() {
            if (this.amountDiamz >= 100)
                bus.$emit("openDialogPayment", this.amountDiamz / 100);
            else
                bus.$emit("openAlert", "Erreur", "Le minimum achetable possible est d'au moins 100 Diamz", "");
        },
        openConfirm() {
            this.dialogConfirm = true;
        },
        goToConfirm(route: string) {
            this.dialogConfirm = false;
        },
        confirmNo() {
            this.dialogConfirm = false;
        },
        changeDiamz() {
            this.amountEuro = this.amountDiamz / 100;
        },
        changeEuro() {
            this.amountDiamz = this.amountEuro * 100;
        },
    },
    created() {
        bus.$on(
            "openDialogBuyDiamz",
            () => {
                this.openConfirm();
            }
        );
    },

});
</script>
