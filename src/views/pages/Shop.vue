<!-- ANCHOR HTML part -->
<template>
<div>
    <!--  ANCHOR SHOP PART -->
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
                                <shop-item v-if="item != ''" :itemId="item.idShop" :itemDescription="item.description" :itemCategory="item.category" :itemName="item.name" :itemPrice="item.price" :itemPicture="item.imgPath" :itemPromo="item.promo" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card class="mx-auto my-6" align="center">
                    <v-card-text class="text-h6 text-center">Solde : {{diamzBalance}} 💎</v-card-text>
                    <v-row class="my-0 py-0">
                        <v-col>
                            <v-btn dark rounded depressed color="cPlay" @click="openDialogBuyDiamz">
                                <v-icon left dark>mdi-diamond-stone</v-icon>Acheter des Diamz
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="my-0 py-0">
                        <v-col class="my-0 py-0">
                            <v-btn dark rounded depressed color="cSocial" @click="openDialogBuyFluz">
                                <v-icon left dark>mdi-hand-coin</v-icon>Acheter du Fluz
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-card-text class="text-h5 text-left">Filtres</v-card-text>
                    <v-text-field class="shrink mb-0 mt-0 ma-2" solo dense prepend-inner-icon="mdi-magnify" label="Rechercher" rounded v-model="searchString"></v-text-field>

                    <v-card-text class="text-h6 mt-0 mb-2 text-left">Catégories</v-card-text>
                    <v-checkbox class="mt-0" v-model="checkboxEquipment" label="Équipements"></v-checkbox>
                    <v-checkbox class="mt-0" v-model="checkboxVocationAppearance" label="Cosmétiques"></v-checkbox>

                    <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="searchShop()">Rechercher</v-btn>
                </v-card>
            </v-col>
        </v-row>
        <alert />

        <!-- ANCHOR BUY DIAMZ DIALOG -->
        <v-dialog id="DialogBuyDiamz" v-model="dialogBuyDiamz" max-width="600">
            <v-card align="center">
                <v-toolbar color="cPrimary2">Acheter des Diamz</v-toolbar>
                <v-img contain src="@/assets/placeholder.png" height="200"></v-img>
                <v-card-text class="text-body-2">Description des diamz ici</v-card-text>
                <v-card-actions class="justify-center">
                    <v-text-field class="shrink mb-0 mt-0 ma-2" solo v-model="amountDiamz" type="number" @change="changeDiamzEuro"></v-text-field>
                    <v-card-text class="text-body-1">Diamz --></v-card-text>
                    <v-text-field class="shrink mb-0 mt-0 ma-2" solo v-model="amountEuro" type="number" @change="changeEuroDiamz"></v-text-field>
                    <v-card-text class="text-body-1">Euro</v-card-text>
                </v-card-actions>
                <v-card-actions class="justify-center">
                    <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="openDialogPayment()">Acheter</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- ANCHOR BUY FLUZ DIALOG -->
        <v-dialog id="DialogPayment" v-model="dialogBuyFluz" max-width="600">
            <v-card align="center">
                <v-toolbar color="cPrimary2">Achat de Fluz</v-toolbar>
                <v-img contain src="@/assets/placeholder.png" height="200"></v-img>
                <v-card-text class="text-body-2">Description du Fluz ici</v-card-text>
                <v-card-actions class="justify-center">
                    <v-text-field class="" solo v-model="amountFluz" type="number" @change="changeDiamzFluz"></v-text-field>
                    <v-card-text class="text-body-1">Fluz --></v-card-text>
                    <v-text-field class="" solo v-model="amountDiamz" type="number" @change="changeFluzDiamz"></v-text-field>
                    <v-card-text class="text-body-1">Diamz</v-card-text>
                </v-card-actions>

                <v-list dense>
                    <v-subheader>Personage bénéficiaire</v-subheader>
                    <v-select :items="userCharacters" item-text="name" item-value="idCharacter" label="Sélectionner un personnage" v-model="selectedCharacter"></v-select>
                </v-list>

                <v-card-actions class="justify-center">
                    <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="fluzPayment()">Payer {{ amountDiamz }} 💎</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- ANCHOR BUY ARTICLE DIALOG -->
        <v-dialog id="DialogPayment" v-model="dialogBuyArticle" max-width="600">
            <v-card align="center">
                <v-toolbar color="cPrimary2">Achat d'un article</v-toolbar>
                <v-img contain :src="articlePicURL" height="200"></v-img>
                <v-card-text class="text-h6 pt-2">{{ articleName }}</v-card-text>
                <v-card-text class="text-body-2">{{ articleDescription }}</v-card-text>
                <v-card-text class="text-body-2">Catégorie : {{ articleCategory }}</v-card-text>
                <v-list dense>
                    <v-subheader>Personage bénéficiaire</v-subheader>
                    <v-select :items="userCharacters" item-text="name" item-value="idCharacter" label="Sélectionner un personnage" v-model="selectedCharacter"></v-select>
                </v-list>

                <v-card-actions class="justify-center">
                    <v-btn dark rounded depressed color="cProfile" class="mb-2 mt-2" @click="fluzPayment()">Payer {{ articlePrice }} 💎</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <dialog-payment />
    </v-container>
</div>
</template>

<script lang="ts">
// ANCHOR External imports
import Vue from "vue";
import axios from "axios";
import validator from "validator";
import {
    EURO_DIAMZ_RATE,
    DIAMZ_FLUZ_RATE
} from "@/utils/constants";

// ANCHOR Internal imports
import {
    bus
} from "@/main";

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
    name: "Shop",
    components: {
        Alert: () => import("@/components/Alert.vue"),
        ShopItem: () => import("@/components/ShopItem.vue"),
        DialogPayment: () => import("@/components/DialogPayment.vue"),
    },
    data() {
        return {
            token: localStorage.getItem("token") || "",
            diamzBalance: 0,
            searchString: "",
            checkboxEquipment: true,
            checkboxVocationAppearance: true,
            email: "michel.baieeeeeeeeeeeee@gmail.com",
            password: "bonjour1234",
            isMobile: false,
            show3: false,
            items: [],
            items4: [],

            userCharacters: [],
            selectedCharacter: 0,
            dialogBuyDiamz: false,
            dialogBuyFluz: false,
            amountDiamz: 100,
            amountFluz: 1000,
            amountEuro: 1,

            dialogBuyArticle: false,
            articleId: 0,
            articlePicURL: "@/assets/placeholder.png",
            articleName: "",
            articleDescription: "",
            articleCategory: "",
            articlePrice: 0,
            articlePromo: 0

        };
    },
    methods: {
        openDialogBuyFluz() {
            this.dialogBuyFluz = true;
        },
        openDialogBuyDiamz() {
            this.dialogBuyDiamz = true;
        },
        openDialogPayment() {
            if (this.amountDiamz >= 100)
                bus.$emit("openDialogPayment", this.amountDiamz / EURO_DIAMZ_RATE);
            else
                bus.$emit("openAlert", "Erreur", "Le minimum achetable possible est d'au moins 100 Diamz", "");
        },
        itemsToItems4(items: any) {
            const itemsLength = items.length;
            const chunkSize = 4;
            let items4 = [];
            for (let i = 0; i < itemsLength; i += chunkSize) {
                const chunk = items.slice(i, i + chunkSize);
                items4.push(chunk);
            }
            return items4;
        },
        changeDiamzEuro() {
            this.amountEuro = this.amountDiamz / EURO_DIAMZ_RATE;
        },
        changeEuroDiamz() {
            this.amountDiamz = this.amountEuro * EURO_DIAMZ_RATE;
        },
        changeFluzDiamz() {
            this.amountFluz = this.amountDiamz * DIAMZ_FLUZ_RATE;
        },
        changeDiamzFluz() {
            this.amountDiamz = this.amountFluz / DIAMZ_FLUZ_RATE;
        },
        authenticate: function (provider: any) {
            this.$auth.authenticate(provider).then(function () {
                // Execute application logic after successful social authentication
            });
        },
        getCharacters() {
            axios
                .get(
                    API_URL + "/character/", {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status == 200) {
                        this.userCharacters = response.data.characters
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                });
        },
        fluzPayment() {
            if (this.selectedCharacter == 0) {
                bus.$emit(
                    "openAlert",
                    "Erreur",
                    "Vous devez sélectionner un personnage !",
                    ""
                );

            } else if (this.amountDiamz > this.diamzBalance) {
                bus.$emit(
                    "openAlert",
                    "Erreur",
                    "Vous n'avez pas assez de Diamz",
                    ""
                );
            } else {
                axios
                    .post(
                        API_URL + "/shop/purchase-fluz", {
                            characterId: this.selectedCharacter,
                            fluzAmount: this.amountFluz,
                        }, {
                            withCredentials: true,
                        }
                    )
                    .then((response) => {
                        if (response.status == 200) {
                            this.diamzBalance = response.data.diamzBalance
                            bus.$emit("openAlert", "Information", "Paiement en Diamz réussi !", "reload");

                        }
                    })
                    .catch(function (error) {
                        localStorage.setItem("isAuthenticated", "false");
                    });
            }
        },
        searchShop() {
            const mayEquipment = this.checkboxEquipment ? 1 : 0;
            const mayVocationAppearance = this.checkboxVocationAppearance ? 1 : 0;
            axios
                .post(
                    API_URL + "/shop/search-shop", {
                        searchString: this.searchString,
                        mayEquipment: mayEquipment,
                        mayVocationAppearance: mayVocationAppearance,
                    }, {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status == 200) {
                        this.items = []
                        for (let i = 0; i < response.data.articles.length; i += 1) {
                            this.items.push(response.data.articles[i]);
                        }

                        this.diamzBalance = response.data.diamzBalance
                        this.items4 = this.itemsToItems4(this.items);
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                });
        },
    },
    created() {
        //localStorage.getItem("isAuthenticated")
        this.searchShop()
        this.getCharacters()
        bus.$on("openDialogBuyArticle", (
        articleId: number, 
        articleDescription: string, 
        articleCategory: string,
        articleName: string, 
        articlePrice: number,
        articlePromo: number,
        articlePicURL: string, ) => {
            this.articleId = articleId
            this.articleDescription = articleDescription
            this.articleCategory = articleCategory
            this.articleName = articleName
            this.articlePrice = articlePrice
            this.articlePicURL = articlePicURL
            this.articlePromo = articlePromo

            this.dialogBuyArticle = true;
        });
    },
});
</script>
