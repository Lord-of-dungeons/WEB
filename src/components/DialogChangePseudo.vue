<template>
<v-dialog v-model="dialog" max-width="600px" class="white">
    <v-card class="px-auto py-6 text-center justify-center">
        <v-card-title class="text-center justify-center">Modifier votre pseudonyme</v-card-title>
        <v-text-field class="text-center mx-2 mt-6" v-model="profile.pseudobis" label="Pseudonyme" required></v-text-field>
        <v-btn rounded dark depressed color="cProfile" @click="updatePseudo">Soumettre</v-btn>
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
    name: "DialogChangePseudo",
    components: {},
    props: {
        profile: Object
    },
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
        updatePseudo() {
            axios
                .put(API_URL + "/user/edit-pseudo", {
                    pseudo: this.profile.pseudobis,
                }, {
                    withCredentials: true
                })
                .then((response) => {
                    if (response.status == 201) {
                        bus.$emit(
                            "openAlert",
                            "Information",
                            "Pseudo mis à jour avec succès."
                        );
                    }
                })
                .catch(function (error) {
                    bus.$emit("openAlert","Erreur",error.response.data.error,"");
                });
        }
    },
    mounted() {
        console.log(this.profile)
    },
    created() {
        bus.$on('changePseudoDialog', (title: string, content: string, goToRoute: string) => {
            this.openAlert(title, content, goToRoute)
        })
    },

});
</script>
