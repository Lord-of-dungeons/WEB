<template>
<v-app>
    <dashboard-core-app-bar />
    <dashboard-core-view />
    <dashboard-core-footer />
</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    bus
} from "../main";


export default Vue.extend({
    name: 'Index',
    components: {
        DashboardCoreAppBar: () => import('@/views/core/AppBar.vue'),
        DashboardCoreView: () => import('@/views/core/View.vue'),
        DashboardCoreFooter: () => import('@/views/core/Footer.vue'),
    },
    data: () => ({
    }),
    computed: {},
    created() {
        this.$vuetify.theme.dark = false;
    },
    async beforeMount() {

    },
    methods: {}
});
</script>
