<template>
<v-footer class="justify-center" color="#292929" height="100">
    <div class="title font-weight-light grey--text text--lighten-1 text-center">
        2022 — Lords of dungeons
    </div>
</v-footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: "DashboardCoreFooter",

    data: () => ({
        insetFooter: false,
        isFixed: false
    }),

});
</script>

<style lang="sass">
</style>
