<!-- ANCHOR HTML part -->
<template>
<div>
    <v-container>
        <v-row>
            <v-col md="9">
                <v-card class="mx-auto my-6">
                    <v-card-title style="word-break: break-word" class="text-h4 justify-left">Boutique</v-card-title>
                    <v-btn large dark rounded depressed color="cPlay" class="ma-2 mb-1 " @click="registerDialog">Acheter des Diamz</v-btn>
                    <v-btn large dark rounded depressed color="cSocial" class="ma-2 mb-1 " @click="registerDialog">Acheter du Fluz</v-btn>
                    <v-card-text class="text-body-1">Résultats de la recherche</v-card-text>
                    <v-card-text class="text-body-1">8 éléments correspondent à vos critères</v-card-text>
                    <v-container v-for="item4 in items4" :key="item4">
                        <v-row>
                            <v-col cols="12" sm="3" v-for="item in item4" :key="item">
                                <shop-item v-if="item != ''" :itemName="item.itemName" :itemPrice="item.itemPrice" :itemPicture="item.itemPicture" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="mx-auto my-6">
                    <v-card-text class="text-body-1">Filtres</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <alert />

    </v-container>
</div>
</template>

<script lang="ts">
// ANCHOR External imports
import Vue from "vue";
import axios from 'axios';
import validator from 'validator';

// ANCHOR Internal imports
import {
    bus
} from "@/main";

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
    name: "Shop",
    components: {
        Alert: () => import('@/components/Alert.vue'),
        DialogDelete: () => import('@/components/DialogDelete.vue'),
        ShopItem: () => import('@/components/ShopItem.vue'),

    },
    data() {
        return {
            email: "michel.baieeeeeeeeeeeee@gmail.com",
            password: "bonjour1234",
            isMobile: false,
            show3: false,
            items: [{
                itemName: "Epee 1",
                itemPrice: 350,
                itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                itemCategory: "equipment"
            },
            {
                itemName: "Epee 2",
                itemPrice: 450,
                itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                itemCategory: "equipment"
            },
            {
                itemName: "Epee 3",
                itemPrice: 350,
                itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                itemCategory: "equipment"
            },
            {
                itemName: "Epee 4",
                itemPrice: 250,
                itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                itemCategory: "equipment"
            },
            {
                itemName: "Epee 5",
                itemPrice: 500,
                itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                itemCategory: "equipment"
            }],
            items4: []
        };
    },
    methods: {
        authenticate: function (provider: any) {
            this.$auth.authenticate(provider).then(function () {
                // Execute application logic after successful social authentication
                console.log("CA MARCHE !!!")
            })
        },
        Login() {
            if (this.email == "" || this.password == "")
                bus.$emit(
                    "openAlert",
                    "Erreur",
                    "Veuillez rentrez des identifiants !",
                    ""
                );
            else {
                if (
                    validator.isEmail(this.email) == false ||
                    validator.isLength(this.password, {
                        min: 8,
                        max: 50
                    }) == false
                ) {
                    bus.$emit(
                        "openAlert",
                        "Erreur",
                        "Syntaxe des identifiants invalide !",
                        ""
                    );
                } else {
                    axios
                        .post(API_URL + "/auth/login", {
                            email: this.email,
                            password: this.password,
                        }, {
                            withCredentials: true
                        })
                        .then((response) => {
                            if (response.status == 200) {
                                localStorage.setItem("isAuthenticated", "true");
                                bus.$emit("login");
                                this.$router.push("/profile");
                            }
                        })
                        .catch(function (error) {
                            localStorage.setItem("isAuthenticated", "false");
                            bus.$emit("openAlert", "Erreur", error.response.data.error, "");
                        });
                }
            }
        },
        registerDialog() {
            bus.$emit("registerDialog");
        },
        itemsToItems4(items: any) {
            console.log('FONCTION ITEMSTOITEMS4')
            const itemsLength = items.length
            const chunkSize = 4
            console.log(itemsLength)
            let items4 = []
            for (let i = 0; i < itemsLength; i += chunkSize) {
                const chunk = items.slice(i, i + chunkSize);
                items4.push(chunk)
            }
            return items4
        }
    },
    created() {
        console.log(this.items)
        this.items4 = this.itemsToItems4(this.items)
        bus.$on("resize", (isMobile: boolean) => {
            this.isMobile = isMobile;
        });
    },
});
</script>
