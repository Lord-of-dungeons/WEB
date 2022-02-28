<template>
<v-dialog id="basicAlert" v-model="dialog" max-width="600px" class="white">
    <v-card class="px-auto py-6 text-center justify-center">
        <v-text-field class="input-group--focused mx-2" v-model="password" :append-icon="showpwd1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd1 ? 'text' : 'password'" name="input-10-2" label="Mot de passe" hint="At least 8 characters" @click:append="showpwd1 = !showpwd1"></v-text-field>
        <v-text-field class="input-group--focused mx-2" v-model="confirmPassword" :append-icon="showpwd2 ? 'mdi-eye' : 'mdi-eye-off'" :type="showpwd2 ? 'text' : 'password'" name="input-10-2" label="Confirmer le mot de passe" hint="At least 8 characters" @click:append="showpwd2 = !showpwd2"></v-text-field>
        <v-btn rounded dark depressed color="cProfile">Soumettre</v-btn>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {
    bus
} from "@/main"
export default Vue.extend({
    name: "DialogChangePassword",
    components: {},
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
        }
    },
    created() {
        bus.$on('changePasswordDialog', (title: string, content: string, goToRoute: string) => {
            this.openAlert(title, content, goToRoute)
        })
    },

});
</script>
