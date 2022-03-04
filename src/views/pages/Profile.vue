<!-- ANCHOR HTML PART -->
<template>
<!-- ANCHOR Page content -->
<div>
    <v-container>
        <v-card>
            <v-container>
                <v-row>
                    <v-col md="3">
                        <nav-profile />
                    </v-col>
                    <v-col md="9">
                        <v-row>
                            <v-col md="9">
                                <h1 class="text-h5 font-weight-bold mb-3">
                                    Modification du profil
                                </h1>
                            </v-col>
                            <v-col md="3">
                                <v-btn dark depressed color="cProfile" class="ml-2 text-button" @click="updateProfile">Mettre à jour</v-btn>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col md="4">
                                <span class="text-body-1">Votre avatar</span>
                                <v-avatar class="ml-3 ml-md-8 mb-3" color="white" size="75">
                                    <v-img contain :src="profile.profilePicturePath"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col md="8">
                                <v-btn  dark depressed color="cProfile" class="mb-md-0 mb-3  mr-md-3 text-button" @click="changeAvatar">Modifier</v-btn>
                            </v-col>
                        </v-row>
                        <v-row class="pt-0" align="center" justify="center">
                            <v-col md="4">
                                <span class="text-body-1 ">Pseudonyme : {{ profile.pseudo }}</span>
                            </v-col>
                            <v-col md="8">
                                <v-btn dark depressed color="cProfile" class="mb-md-0 mb-3  mr-md-3 text-button" @click="changePseudo">Modifier</v-btn>
                            </v-col>
                        </v-row>

                        <v-text-field class="text-center mx-2 mt-6" v-model="profile.firstname" label="Prénom" required></v-text-field>
                        <v-text-field class="text-center mx-2" v-model="profile.lastname" label="Nom" required></v-text-field>
                        <!-- Date Picker -->
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="profile.birthday" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field class="text-center mx-2" v-model="profile.birthday" label="Date de naissance" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="profile.birthday" scrollable header-color="cPrimary2" color="cPrimary2" locale="fr-FR">
                                <v-spacer></v-spacer>
                                <v-btn text color="black" @click="modal = false"> Annuler </v-btn>
                                <v-btn text color="black" @click="$refs.dialog.save(profile.birthday)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>

                        <v-text-field class="text-center mx-2" v-model="profile.email" label="Email" required></v-text-field>
                        <v-switch class='ml-3' inset color="cMulti" v-model="profile.newsletter" :label="`Newsletter`"></v-switch>

                        <v-btn dark depressed color="cProfile" class="mb-md-0 mb-3 ml-2 text-button" @click="changePassword">Changer le mot de passe</v-btn>
                        <v-btn dark depressed color="cFontEmail" class="ml-2 text-button" @click="deleteAccount">
                            <v-icon left dark>mdi-alert</v-icon>Supprimer le compte
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <alert />
        <dialog-change-password />
        <dialog-change-pseudo :profile="profile" />
        <dialog-change-avatar :profile="profile" />
        <dialog-delete />
    </v-container>
</div>
</template>

<!-- ANCHOR SCRIPT PART -->

<script lang="ts">
// ANCHOR External import
import Vue from "vue";
import axios from "axios";

// ANCHOR Internal import
import {
    bus
} from "@/main";
import router from "@/router"

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
    name: "Profile",
    components: {
        Alert: () => import('@/components/Alert.vue'),
        NavProfile: () => import('@/components/NavProfile.vue'),
        DialogChangeAvatar: () => import('@/components/DialogChangeAvatar.vue'),
        DialogChangePassword: () => import('@/components/DialogChangePassword.vue'),
        DialogChangePseudo: () => import('@/components/DialogChangePseudo.vue'),
        DialogDelete: () => import('@/components/DialogDelete.vue'),
    },
    data() {
        return {
            modal: false,
            profile: {
                firstname: "",
                lastname: "",
                birthday: "",
                pseudo: "",
                pseudobis: "",
                email: "",
                newsletter: false,
                profilePicturePath: "",
            },

        };
    },
    methods: {
        changePseudo() {
            bus.$emit("changePseudoDialog");
        },
        changePassword() {
            bus.$emit("changePasswordDialog");
        },
        changeAvatar() {
            bus.$emit("changeAvatarDialog");
        },
        deleteAccount() {
            bus.$emit(
                "openConfirm",
                "Attention",
                "Voulez vous supprimer votre compte ? (Cette action est irréversible)",
                "",
                "/admin/deleteComment",
                "idComment",
                ""
            );
        },
        getProfile() {
            axios
                .get(API_URL + "/user/profile", {
                    withCredentials: true
                })
                .then((response) => {
                    if (response.status == 200) {
                        const data = response.data
                        this.profile.firstname = data.firstname
                        this.profile.lastname = data.lastname
                        this.profile.birthday = data.birthday
                        this.profile.pseudo = data.pseudo
                        this.profile.pseudobis = data.pseudo
                        this.profile.email = data.email
                        this.profile.newsletter = !!+data.newsletter //convert tinyint to boolean
                        this.profile.profilePicturePath = API_URL.slice(0, -4) + data.profilePicturePath
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                    bus.$emit("openAlert", "Erreur", error.response.data.error, "");
                });
        },
        updateProfile() {
            axios
                .put(API_URL + "/user/edit-profile", {
                    firstname: this.profile.firstname,
                    lastname: this.profile.lastname,
                    birthday: this.profile.birthday,
                    email: this.profile.email,
                    newsletter: this.profile.newsletter,
                }, {
                    withCredentials: true
                })
                .then((response) => {
                    if (response.status == 201) {
                        bus.$emit(
                            "openAlert",
                            "Information",
                            "Profil mis à jour avec succès."
                        );
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                    bus.$emit(
                        "openAlert",
                        "Erreur",
                        "Syntaxe des informations invalide !",
                        ""
                    );
                });
        }
    },

    mounted() {
        const API_URL = "";
        this.getProfile();
    },
});
</script>
