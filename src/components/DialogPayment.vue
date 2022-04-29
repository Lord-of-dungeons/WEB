<template>
<v-dialog id="DialogPayment" v-model="dialogConfirm" max-width="600">
    <v-card align="center">
        <v-toolbar color="cPrimary2">Votre paiement</v-toolbar>
        <v-text-field class="text-center" v-model="cardNumber" label="Numéro de carte" required></v-text-field>
        <v-text-field class="text-center" v-model="expMonth" label="Mois d'expiration" required></v-text-field>
        <v-text-field class="text-center" v-model="expYear" label="Année d'expiration" required></v-text-field>
        <v-text-field class="text-center" v-model="cvc" label="CVC" required></v-text-field>

        <v-card-actions class="justify-center">
            <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="payment()">Payer {{amountEuro}}€</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {
    bus
} from "@/main";
import axios from 'axios';
import validator from 'validator';
const API_URL = process.env.VUE_APP_API_URL as string;
export default Vue.extend({
    name: "DialogPayment",
    components: {
        Alert: () => import("@/components/Alert.vue"),
    },
    data() {
        return {
            token: localStorage.getItem("token") || "",
            dialogConfirm: false,

            cardNumber: "4242424242424242",
            expMonth: '12',
            expYear:'2023' ,
            cvc: '313',

            amountEuro: 1
        };
    },
    methods: {
        openConfirm(amount: number) {
            this.amountEuro = amount
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
        payment() {
            if (validator.isCreditCard(this.cardNumber) && this.cvc.match(/^[0-9]{3,4}$/)) {

                axios
                    .post(API_URL + "/shop/purchase-diamz", {
                        diamzAmount: this.amountEuro * 100,
                        cardNumber: this.cardNumber,
                        exp_month: this.expMonth,
                        exp_year: this.expYear,
                        cvc: this.cvc,
                    }, {
                        withCredentials: true
                    })
                    .then((response) => {
                        if (response.status == 201) {
                            // TODO close all dialogs when buying diamz
                            bus.$emit("openAlert", "Information", "Paiement réussi !", "reload");
                            this.dialogConfirm = false
                        }
                    })
                    .catch(function (error) {
                        localStorage.setItem("isAuthenticated", "false");
                        bus.$emit("openAlert", "Erreur", error.response.data.error, "");
                    });
            } else {
                bus.$emit(
                    "openAlert",
                    "Erreur",
                    "Carte invalide !",
                    ""
                );
            }
        }
    },
    created() {
        bus.$on("openDialogPayment", (amount: number) => {
            this.openConfirm(amount);
        });
    },
});
</script>
