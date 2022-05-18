<template>
<v-dialog id="basicConfirmDelete" persistent v-model="dialogConfirm" max-width="600">
    <v-card>
        <v-toolbar color="cPrimary2">{{ dialogTitleConfirm }}</v-toolbar>
        <v-card-text>
            <div class="text-h5 pa-12">{{ dialogContentConfirm }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn text @click="confirmNo()">Non</v-btn>
            <v-btn text @click="goToConfirm(goToRouteConfirm)">Oui</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {
    bus
} from "@/main";
import axios from "axios";
const API_URL = process.env.VUE_APP_API_URL as string;
export default Vue.extend({
    name: "DialogDelete",
    components: {},
    data() {
        return {
            token: localStorage.getItem("token") || "",
            goToRoute: "",
            routeURLConfirm: "",
            idNameConfirm: "",
            idConfirm: "",
            dialogConfirm: false,
            dialogTitleConfirm: "",
            dialogContentConfirm: "",
            goToRouteConfirm: "",
        };
    },
    methods: {
        openConfirm(title: string, content: string, goToRoute: string) {
            this.dialogTitleConfirm = title;
            this.dialogContentConfirm = content;
            this.goToRouteConfirm = goToRoute;
            this.dialogConfirm = true;
        },
        goToConfirm(route: string) {
            this.dialogConfirm = false;
        },
        confirmNo() {
            this.dialogConfirm = false;
        },
    },
    created() {
        bus.$on(
            "openConfirm",
            (title: string, content: string, goToRoute: string, routeURL: string, idName: string, id: string) => {
                this.routeURLConfirm = routeURL
                this.goToRoute = goToRoute
                this.idNameConfirm = idName
                this.idConfirm = id
                this.openConfirm(title, content, goToRoute);
            }
        );
    },
});
</script>
