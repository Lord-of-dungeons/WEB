<template>
<v-card :loading="loading" class="mx-auto my-3" max-width="374" align="centerhy">
    <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="200" width="200" :src="itemPicture"></v-img>
    <div class="grey lighten-3">
        <v-card-text class="text-center text-body-1"><a>{{ itemName }}</a></v-card-text>
    </div>
    <v-divider class="mx-4"></v-divider>

    <v-card-text class="text-center text-body-1">{{ itemPrice }} 💎</v-card-text>

</v-card>
</template>

<script>
export default {
    props: ['itemName', 'itemPrice', 'itemPicture'],
    data: () => ({
        loading: false,
        selection: 1,
    }),

    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>
