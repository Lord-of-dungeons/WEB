<!-- ANCHOR HTML part -->
<template>
<div>
    <v-container>
        <v-row>
            <v-col md="9">
                <v-card class="mx-auto my-6">
                    <v-card-title style="word-break: break-word" class="text-h4 justify-left">Boutique</v-card-title>
                    <v-card-text class="text-h6">Résultats de la recherche</v-card-text>
                    <v-card-text class="text-body-1">{{items.length}} éléments correspondent à vos critères</v-card-text>
                    <!-- if v-key is used in v-for, errors will occurs in the front -->
                    <v-container v-for="item4 in items4">
                        <v-row>
                            <v-col cols="12" sm="3" v-for="item in item4">
                                <shop-item v-if="item != ''" :itemName="item.itemName" :itemPrice="item.itemPrice" :itemPicture="item.itemPicture" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="mx-auto my-6" align="center">
                    <v-card-text class="text-h6 text-center">Solde : {{diamzAmount}} 💎</v-card-text>
                    <v-row class="my-0 py-0">
                        <v-col>
                            <v-btn dark rounded depressed color="cPlay" @click="registerDialog">
                                <v-icon left dark>mdi-diamond-stone</v-icon>Acheter des Diamz
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="my-0 py-0">
                        <v-col class="my-0 py-0">
                            <v-btn dark rounded depressed color="cSocial" @click="registerDialog">
                                <v-icon left dark>mdi-hand-coin</v-icon>Acheter du Fluz
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-card-text class="text-h5 text-left">Filtres</v-card-text>
                    <v-text-field class="shrink mb-0 mt-0 ma-2" solo dense prepend-inner-icon="mdi-magnify" label="Rechercher" rounded></v-text-field>

                    <v-card-text class="text-h6 mt-0 mb-2 text-left">Catégories</v-card-text>
                    <v-checkbox class="mt-0" v-model="checkboxEquipment" label="Équipements"></v-checkbox>
                    <v-checkbox class="mt-0" v-model="checkboxSkin" label="Cosmétiques"></v-checkbox>

                    <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="registerDialog">Rechercher</v-btn>
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
import axios from "axios";
import validator from "validator";

// ANCHOR Internal imports
import {
    bus
} from "@/main";

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
    name: "Shop",
    components: {
        Alert: () => import("@/components/Alert.vue"),
        DialogDelete: () => import("@/components/DialogDelete.vue"),
        ShopItem: () => import("@/components/ShopItem.vue"),
    },
    data() {
        return {
            diamzAmount: 777,
            checkboxEquipment: true,
            checkboxSkin: true,
            email: "michel.baieeeeeeeeeeeee@gmail.com",
            password: "bonjour1234",
            isMobile: false,
            show3: false,
            items: [{
                    itemName: "Épée de Lucien 1",
                    itemPrice: 350,
                    itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                    itemCategory: "equipment",
                    promotion: false,
                },
                {
                    itemName: "Épée de Lucien 2",
                    itemPrice: 450,
                    itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                    itemCategory: "equipment",
                    promotion: false,
                },
                {
                    itemName: "Épée de Lucien 3",
                    itemPrice: 350,
                    itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                    itemCategory: "equipment",
                    promotion: false,
                },
                {
                    itemName: "Épée de Lucien 4",
                    itemPrice: 250,
                    itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                    itemCategory: "equipment",
                    promotion: false,
                },
                {
                    itemName: "Épée de Lucien 5",
                    itemPrice: 500,
                    itemPicture: "https://i.postimg.cc/CKmLxY15/t2.png",
                    itemCategory: "equipment",
                    promotion: false,
                },
            ],
            items4: [],
        };
    },
    methods: {
        authenticate: function (provider: any) {
            this.$auth.authenticate(provider).then(function () {
                // Execute application logic after successful social authentication
            });
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
                        max: 50,
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
                        .post(
                            API_URL + "/auth/login", {
                                email: this.email,
                                password: this.password,
                            }, {
                                withCredentials: true,
                            }
                        )
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
            const itemsLength = items.length;
            const chunkSize = 4;
            console.log(itemsLength);
            let items4 = [];
            for (let i = 0; i < itemsLength; i += chunkSize) {
                const chunk = items.slice(i, i + chunkSize);
                items4.push(chunk);
            }
            return items4;
        },
    },
    created() {
        console.log(this.items);
        this.items4 = this.itemsToItems4(this.items);
        bus.$on("resize", (isMobile: boolean) => {
            this.isMobile = isMobile;
        });
    },
});
</script>
