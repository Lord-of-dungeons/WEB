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
                                <v-btn dark depressed color="cProfile" class="ml-2 text-button">Mettre à jour</v-btn>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col md="4">
                                <span class="text-body-1">Votre avatar</span>
                                <v-avatar class="ml-3 ml-md-8 mb-3" color="white" size="75">
                                    <v-img contain :src="ppURL"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col md="8">
                                <v-btn small dark depressed color="cProfile" class="mb-md-0 mb-3  mr-md-3 text-button">Changer d'avatar</v-btn>
                                <v-btn small dark depressed color="cProfile" class="mb-md-0 mb-3  text-button">Supprimer l'avatar</v-btn>
                            </v-col>
                        </v-row>
                        <v-text-field class="text-center mx-2" v-model="firstname" label="Prénom" required></v-text-field>
                        <v-text-field class="text-center mx-2" v-model="lastname" label="Nom" required></v-text-field>
                        <!-- Date Picker -->
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="birthdayDate" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field class="text-center mx-2" v-model="birthdayDate" label="Date de naissance" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="birthdayDate" scrollable header-color="cPrimary2" color="cPrimary2" locale="fr-FR">
                                <v-spacer></v-spacer>
                                <v-btn text color="black" @click="modal = false"> Annuler </v-btn>
                                <v-btn text color="black" @click="$refs.dialog.save(birthdayDate)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                        <v-text-field class="text-center mx-2" v-model="pseudo" label="Pseudonyme" required></v-text-field>
                        <v-text-field class="text-center mx-2" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                        <v-switch class ='ml-3' inset color="cMulti" v-model="switchNewsletter" :label="`Newsletter`"></v-switch>

                        <v-btn dark depressed color="cProfile" class="mb-md-0 mb-3 ml-2 text-button" @click="changePassword">Changer le mot de passe</v-btn>
                        <v-btn dark depressed color="cFontEmail" class="ml-2 text-button" @click="deleteAccount">
                            <v-icon left dark>mdi-alert</v-icon>Supprimer le compte
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <dialog-change-password />
        <dialog-delete />
    </v-container>
</div>
</template>

<!-- ANCHOR SCRIPT PART -->

<script lang="ts">
// ANCHOR External import
import Vue from "vue";
import {
    bus
} from "@/main";

// ANCHOR Internal import

export default Vue.extend({
    name: "Profile",
    components: {
        NavProfile: () => import('@/components/NavProfile.vue'),
        DialogChangePassword: () => import('@/components/DialogChangePassword.vue'),
        DialogDelete: () => import('@/components/DialogDelete.vue'),
    },
    data() {
        return {
            modal: false,
            firstname: "Michel",
            lastname: "Forever",
            birthdayDate: "1990-06-23",
            pseudo: "michFor4ver",
            email: "michFor4ver@gmail.com",
            switchNewsletter: true,
            ppURL: "https://pbs.twimg.com/media/E2EA4moXsAIeOPq?format=jpg&name=large",
        };
    },
    methods: {
        changePassword() {
            bus.$emit("changePasswordDialog");
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
    },
    mounted() {
        const API_URL = "";
    },
});
</script>
