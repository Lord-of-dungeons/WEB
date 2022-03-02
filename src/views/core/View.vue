<template>
<v-main>
    <vue-page-transition name="fade-in-down">
        <router-view class="mb-7" style="z-index: 99" />
    </vue-page-transition>

</v-main>
</template>

<script lang="ts">
import {
    bus
} from "@/main";
import Vue from 'vue';

export default Vue.extend({
    name: "DashboardCoreView",
    components: {

    },
    data() {
        return {}
    },
    created() {},
    watch: {},
    computed: {}
});
</script>

<style>
</style>
