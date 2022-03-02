<template>
<v-dialog id="basicAlert" v-model="dialog" max-width="600px" class="white">
    <v-card class="px-auto py-6 text-center justify-center">
        <v-container>
            <v-card-title class="justify-center">Inscription</v-card-title>
            <v-text-field class="text-center mx-2" v-model="lastname" label="Nom" required></v-text-field>
            <v-text-field class="text-center mx-2" v-model="firstname" label="Prénom" required></v-text-field>
            <v-text-field class="text-center mx-2" v-model="pseudo" label="Pseudonyme" required></v-text-field>
            <v-text-field class="text-center mx-2" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            <!-- Date Picker -->
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="birthdayDate" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field class="text-center mx-2" v-model="birthdayDate" label="Date de naissance" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="birthdayDate" scrollable header-color="cPrimary2" color="cPrimary2" locale="fr-FR">
                    <v-spacer></v-spacer>
                    <v-btn text color="black" @click="modal = false">
                        Annuler
                    </v-btn>
                    <v-btn text color="black" @click="$refs.dialog.save(birthdayDate)">
                        OK
                    </v-btn>
                </v-date-picker>
            </v-dialog>
            <v-text-field class="input-group--focused mx-2" v-model="password" :append-icon="showpwd1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd1 ? 'text' : 'password'" name="input-10-2" label="Mot de passe" hint="At least 8 characters" @click:append="showpwd1 = !showpwd1"></v-text-field>
            <v-text-field class="input-group--focused mx-2" v-model="confirmPassword" :append-icon="showpwd2 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd2 ? 'text' : 'password'" name="input-10-2" label="Confirmer le mot de passe" hint="At least 8 characters" @click:append="showpwd2 = !showpwd2"></v-text-field>

            <v-btn rounded dark depressed color="cProfile" @click="Register">Soumettre</v-btn>
        </v-container>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios"
import {
    bus
} from "@/main"
const API_URL = process.env.VUE_APP_API_URL as string;
export default Vue.extend({
    name: "DialogRegister",
    components: {},
    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            pseudo: "",
            birthday: "",
            password: "",
            profilePicturePath: "",
            newsletter: true,

            modal: false,
            showpwd1: false,
            showpwd2: false,
            dialog: false,
            dialogTitle: "",
            dialogContent: "",
            goToRoute: "",
        };
    },
    methods: {
        openRegisterDialog(title: string, content: string, goToRoute: string) {
            this.dialogTitle = title;
            this.dialogContent = content;
            this.goToRoute = goToRoute;
            this.dialog = true;
        },
        goTo(route: string) {
            if (route != "") this.$router.push(route);
            this.dialog = false;
        },
        Register() {
            if (this.password === this.confirmPassword) {
                // FIXME birthday date is 0000-00-00 in DB
                axios
                    .post(API_URL + "/auth/register", {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email,
                        pseudo: this.pseudo,
                        birthday: this.birthday,
                        password: this.password,
                        profilePicturePath: this.profilePicturePath,
                        newsletter: this.newsletter,
                    }, {
                        withCredentials: true
                    })
                    .then((response) => {
                        if (response.status == 201) {
                            bus.$emit(
                                "openAlert",
                                "Information",
                                "Inscription Réussite."
                            );
                        }
                    })
                    .catch(function (error) {
                        bus.$emit("openAlert", "Erreur", error.response.data.error, "");
                    });
            } else {
                bus.$emit(
                    "openAlert",
                    "Erreur",
                    "Les 2 mots de passes ne sont pas identiques"
                );
            }
        }
    },
    created() {
        bus.$on('registerDialog', (title: string, content: string, goToRoute: string) => {
            this.openRegisterDialog(title, content, goToRoute)
        })
    },
});
</script>
