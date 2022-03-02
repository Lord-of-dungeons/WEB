<template>
<v-app-bar app color="cPrimary2 accent-4" height="100">
    <v-avatar class="mr-3" color="cPrimary2 accent-4" size="100">
        <v-img contain src="@/assets/main-logo-textless.png"></v-img>
    </v-avatar>
    <v-toolbar-title class="centered-tex">Lords of dungeons</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- ANCHOR Desktop view -->
    <div class="d-none d-md-block">
        <v-btn small dark depressed color="cPlay" class="ml-2 text-button" @click="$router.push('/home')">Présentation</v-btn>
        <v-btn small dark depressed color="cShop" class="ml-2 text-button">Boutique</v-btn>
        <v-btn small dark depressed color="cProfile" class="ml-2 text-button" @click="$router.push(routeProfile)">{{
          textProfile
        }}</v-btn>
    </div>

    <!-- ANCHOR Mobile view -->
    <div class="d-block d-md-none">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon large v-bind="attrs" v-on="on">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <v-btn small dark depressed color="cPlay" class="text-button" @click="$router.push('/home')">Présentation</v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small dark depressed color="cShop" class="text-button">Boutique</v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small dark depressed color="cProfile" class="text-button" @click="$router.push(routeProfile)">{{ textProfile }}</v-btn>
                </v-list-item>
                </v-list-item>
            </v-list>
        </v-menu>

    </div>
</v-app-bar>
</template>

<script lang="ts">
// ANCHOR External imports
import Vue from "vue";

// ANCHOR Internal imports
import {
    bus
} from "@/main";

let isConnected = true;
export default Vue.extend({
    name: "App",
    components: {},
    data() {
        return {
            textProfile: "Connexion",
            routeProfile: "/profile"
        };
    },
    methods: {},
    created() {

    },
    mounted() {
        const params = {
            isAuthenticated: this.$route.params.isAuthenticated == "true",
        };
        const API_URL = "";
        if (params.isAuthenticated) this.textProfile = "Profile";
    },
});
</script>
