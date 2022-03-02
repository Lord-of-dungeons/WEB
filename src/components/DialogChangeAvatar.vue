<template>
<v-dialog v-model="dialog" max-width="600px" class="white">
    <v-card class="px-auto py-6 text-center justify-center">
        <span class="text-body-1">Votre avatar</span>
        <v-avatar class="ml-3 ml-md-8 mb-3" color="white" size="75">
            <v-img contain :src="profile.profilePicturePath"></v-img>
        </v-avatar>
        <v-text-field class="text-center mx-2" v-model="profile.profilePicturePath" label="URL" required></v-text-field>
        <v-btn rounded dark depressed color="cProfile" @click="updatePP">Soumettre</v-btn>
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
    name: "DialogChangeAvatar",
    components: {},
    props: ['profile'],
    data() {
        return {
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
        updatePP() {
            axios
                .put(API_URL + "/user/edit-profile", {
                    profilePicturePath: this.profile.profilePicturePath,
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
                    bus.$emit("openAlert", "Erreur", error.response.data.error, "");
                });
        }
    },
    created() {
        bus.$on('changeAvatarDialog', (title: string, content: string, goToRoute: string) => {
            this.openAlert(title, content, goToRoute)
        })
    },
});
</script>
