<template>
<v-card  height="300"  flat>
    <v-navigation-drawer class="cPrimary accent-4" permanent width='100%'>
        <v-list>
            <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title @click="$router.push(item.goTo)">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn block depressed color="cPrimary" class="cFontEmail--text" @click="logout()">
                    <v-icon left dark >mdi-logout</v-icon>Déconnexion
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</v-card>
</template>

<script lang="ts">
// ANCHOR External imports
import Vue from "vue";
import axios from "axios";

// ANCHOR Internal imports
import {
    bus
} from "@/main";

const API_URL = process.env.VUE_APP_API_URL as string;
let isConnected = true;
export default Vue.extend({
    name: "NavProfile",
    components: {},
    data() {
        return {
            textProfile: "Connexion",
            isMobile: false,
            items: [
                {
                    title: 'Social',
                    icon: 'mdi-account-group',
                    goTo: '/social'
                },
                {
                    title: 'Modifier mon profil',
                    icon: 'mdi-account',
                    goTo: '/profile'
                },
                {
                    title: 'Statistiques',
                    icon: 'mdi-chart-areaspline-variant',
                    goTo: '/profile'
                },
                {
                    title: 'À propos',
                    icon: 'mdi-information',
                    goTo: '/profile'
                },
            ],
        };
    },
    methods: {
        logout() {
            axios
                .delete(
                    API_URL + "/auth/logout", {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status == 200) {
                        localStorage.setItem("isAuthenticated", "false");
                        location.reload();
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                    location.reload();
                });
        },
    },
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
