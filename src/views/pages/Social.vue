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
                                    Social
                                </h1>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col>
                                <v-btn x-large dark depressed color="cProfile" class="mb-md-0 mb-3 ml-2 text-button" @click="changePassword">Accéder à la Messagerie</v-btn>
                                <v-text-field class="text-center mx-2 mt-6" filled v-model="wantedFriendPseudo" label="Saisissez un pseudo"></v-text-field>
                                <v-btn dark depressed color="cProfile" class="mb-md-0 mb-3 ml-2 text-button" @click="addFriend()">Ajouter en ami</v-btn>
                                <v-autocomplete class=" mx-2 mt-6" v-model="selectedFriend" :items="friendList" filled label="Supprimer un ami"></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <alert />
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
    name: "Social",
    components: {
        Alert: () => import('@/components/Alert.vue'),
        NavProfile: () => import('@/components/NavProfile.vue'),
    },
    data() {
        return {
            modal: false,
            wantedFriendPseudo: "",
            selectedFriend: "",
            friendList: []

        };
    },
    methods: {
        getFriendList() {
            axios
                .post(API_URL + "/user/add-friend", {
                    pseudo: this.wantedFriendPseudo,
                }, {
                    withCredentials: true
                })
                .then((response) => {
                    if (response.status == 201) {
                        bus.$emit(
                            "openAlert",
                            "Information",
                            response.data.message
                        );
                        this.friendList.push(this.wantedFriendPseudo)
                    }
                })
                .catch(function (error) {
                    if (error.response.status == 404 || error.response.status == 400)
                        bus.$emit(
                            "openAlert",
                            "Information",
                            error.response.data.error
                        );
                    else
                        localStorage.setItem("isAuthenticated", "false");
                });
        },
        addFriend() {
            axios
                .post(API_URL + "/user/add-friend", {
                    pseudo: this.wantedFriendPseudo,
                }, {
                    withCredentials: true
                })
                .then((response) => {
                    if (response.status == 201) {
                        bus.$emit(
                            "openAlert",
                            "Information",
                            response.data.message
                        );
                        this.friendList.push(this.wantedFriendPseudo)
                    }
                })
                .catch(function (error) {
                    if (error.response.status == 404 || error.response.status == 400)
                        bus.$emit(
                            "openAlert",
                            "Information",
                            error.response.data.error
                        );
                    else
                        localStorage.setItem("isAuthenticated", "false");
                });
        }
    },

    mounted() {
        const API_URL = "";
    },
});
</script>
