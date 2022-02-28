<!-- ANCHOR HTML part -->
<template>
<div>
    <v-container>
        <v-card class="mx-auto my-6 text-center justify-center">
            <v-row align="center" justify="center">
                <v-col md="5">
                    <v-container>
                        <v-card-title style="word-break: break-word" class="justify-center">Rejoignez l'univers Lord of Dungeons</v-card-title>
                        <v-text-field class="text-center" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                        <v-text-field class="input-group--focused " v-model="password" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :type="show3 ? 'text' : 'password'" name="input-10-2" label="Mot de passe" hint="At least 8 characters" @click:append="show3 = !show3"></v-text-field>

                        <v-btn rounded dark depressed color="cProfile" @click="Login">Go</v-btn>
                        <v-card-text class="text-body-1">Vous n'avez pas encore de compte ?</v-card-text>
                        <div class="px-3">
                            <v-btn rounded depressed color="cPrimary" class="ma-2 mb-1 cFontEmail--text" @click="registerDialog">
                                <v-icon left dark>mdi-email-outline</v-icon>Email
                            </v-btn>
                            <v-btn rounded dark depressed color="cFacebook" class="ma-2 mb-1">
                                <v-icon left dark>mdi-facebook</v-icon>Facebook
                            </v-btn>
                            <v-btn rounded dark depressed color="cGoogle" class="ma-2 mb-1">
                                <v-icon left dark>mdi-google</v-icon>Google
                            </v-btn>
                            <v-btn rounded dark depressed color="cGithub" class="ma-2">
                                <v-icon left dark>mdi-github</v-icon>Github
                            </v-btn>
                        </div>
                    </v-container>
                </v-col>
                <v-col md="7" class="grey lighten-3 pa-0 d-none d-md-block">
                    <v-img contain src="@/assets/hero-clean-square.png"></v-img>
                </v-col>
            </v-row>
            <alert/>
            <dialog-register/>
            <dialog-delete/>
        </v-card>
    </v-container>
</div>
</template>

<script lang="ts">
// ANCHOR External imports
import Vue from "vue";
import router from "@/router";
import axios from "axios";
import validator from 'validator';

// ANCHOR Internal imports
import {
    bus
} from "@/main";

const API_URL = process.env.VUE_APP_API_URL as string;
console.log('API_URL: ', API_URL)

let isConnected = true;
export default Vue.extend({
    name: "App",
    components: {
        Alert: () => import('@/components/Alert.vue'),
        DialogDelete: () => import('@/components/DialogDelete.vue'),
        DialogRegister: () => import('@/components/DialogRegister.vue'),
    },
    data() {
        return {
            email: "michel.baieeeeeeeeeeeee@gmail.com",
            password: "bonjour1234",
            isMobile: false,
            show3: false,
            titles: ["Présentation du jeu", "Histoire", "Gameplay", "Multijoueur"],
            contents: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "",
            ],
            imgs: [
                "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
                "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
                "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
                "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            ],
            items: [],
        };
    },
    methods: {
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
                                router.push("/profile");
                            }
                        })
                        .catch(function (error) {
                            if (error.response.status == 400) {
                                bus.$emit(
                                    "openAlert",
                                    "Erreur",
                                    "Identifiants incorrect !",
                                    ""
                                );
                            }
                        });
                }
            }
        },
        registerDialog() {
            bus.$emit("registerDialog");
        },
    },
    created() {
        bus.$on("resize", (isMobile: boolean) => {
            this.isMobile = isMobile;
        });
    },
});
</script>
