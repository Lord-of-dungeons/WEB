<template>
<v-dialog v-model="dialog" max-width="600px" class="white">
    <v-card class="px-auto py-6 text-center justify-center">
        <v-card-title class="text-center justify-center">Changer votre mot de passe</v-card-title>
        <v-text-field class="input-group--focused mx-2" v-model="old_password" :append-icon="showpwd1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd1 ? 'text' : 'password'" name="input-10-2" label="Mot de passe Actuel" @click:append="showpwd1 = !showpwd1"></v-text-field>
        <v-text-field class="input-group--focused mx-2" v-model="password" :append-icon="showpwd2 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd2 ? 'text' : 'password'" name="input-10-2" label="Nouveau mot de passe" @click:append="showpwd2 = !showpwd2"></v-text-field>
        <v-text-field class="input-group--focused mx-2" v-model="confirmPassword" :append-icon="showpwd3 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd3 ? 'text' : 'password'" name="input-10-2" label="Confirmer le nouveau mot de passe" @click:append="showpwd3 = !showpwd3"></v-text-field>
        <v-btn rounded dark depressed color="cProfile" @click="updatePassword">Soumettre</v-btn>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import {
    bus
} from "@/main"
const API_URL = process.env.VUE_APP_API_URL as string;
export default Vue.extend({
    name: "DialogChangePassword",
    components: {},
    data() {
        return {
            old_password: "",
            password: "",
            confirmPassword: "",
            modal: false,
            showpwd1: false,
            showpwd2: false,
            showpwd3: false,
            dialog: false,
            dialogTitle: "",
            dialogContent: "",
            goToRoute: "",
        };
    },
    methods: {
        openAlert(title: string, content: string, goToRoute: string) {
            this.dialogTitle = title;
            this.dialogContent = content;
            this.goToRoute = goToRoute;
            this.dialog = true;
        },
        goTo(route: string) {
            if (route != "") this.$router.push(route);
            this.dialog = false;
        },
        updatePassword() {
            if (this.confirmPassword === this.password) {
                axios
                    .put(API_URL + "/user/edit-password", {
                        old_password: this.old_password,
                        new_password: this.password,
                    }, {
                        withCredentials: true
                    })
                    .then((response) => {
                        if (response.status == 201) {
                            bus.$emit(
                                "openAlert",
                                "Information",
                                "Mot de passe mis à jour avec succès."
                            );
                        }
                    })
                    .catch(function (error) {
                        bus.$emit("openAlert", "Erreur", error.response.data.error, "");
                    });
            } else {
                bus.$emit(
                    "openAlert",
                    "Information",
                    "Les mots de passe ne sont pas identiques"
                );
            }
        }
    },
    created() {
        bus.$on('changePasswordDialog', (title: string, content: string, goToRoute: string) => {
            this.openAlert(title, content, goToRoute)
        })
    }
});
</script>
