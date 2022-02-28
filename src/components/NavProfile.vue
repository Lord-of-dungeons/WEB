<template>
<v-card  height="240"  flat>
    <v-navigation-drawer class="cPrimary accent-4" permanent >
        <v-list>
            <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn block depressed color="cPrimary" class="cFontEmail--text">
                    <v-icon left dark>mdi-logout</v-icon>Déconnexion
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</v-card>
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
    name: "NavProfile",
    components: {},
    data() {
        return {
            textProfile: "Connexion",
            isMobile: false,
            items: [{
                    title: 'Modifier mon profil',
                    icon: 'mdi-account'
                },
                {
                    title: 'Statistiques',
                    icon: 'mdi-chart-areaspline-variant'
                },
                {
                    title: 'À propos',
                    icon: 'mdi-information'
                },
            ],
        };
    },
    methods: {},
    created() {
        bus.$on("resize", (isMobile: boolean) => {
            this.isMobile = isMobile;

        });
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

<style>
</style>
