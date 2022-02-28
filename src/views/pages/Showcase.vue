<template>
<div>

    <section id="hero">
        <v-row no-gutters>
            <v-img :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'" src="@/assets/hero-clean.png">
                <v-theme-provider dark>
                    <v-container fill-height>
                        <v-row align="center" class="white--text mx-auto" justify="center">
                            <v-col class="white--text text-center" cols="12" tag="h1">
                                <span :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']" class="font-weight-light" style='font-family: "Bungee", sans-serif !important;'>
                                    BIENVENUE SUR
                                </span>

                                <br>

                                <span :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']" class="font-weight-black" style='font-family: "Bungee", sans-serif !important;'>
                                    LORDS OF DUNGEONS
                                </span>
                            </v-col>

                            <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#about-me')">
                                <v-icon>mdi-chevron-double-down</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-theme-provider>
            </v-img>
        </v-row>
    </section>

    <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
            <h2 class="display-2 font-weight-bold mb-3" style='font-family: "Montserrat", sans-serif !important;'>PRÉSENTATION DU JEU</h2>

            <v-responsive class="mx-auto mb-8" width="56">
                <v-divider class="mb-1"></v-divider>

                <v-divider></v-divider>
            </v-responsive>

            <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720" style='font-family: "Montserrat", sans-serif !important;'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam
            </v-responsive>

            <v-avatar class="elevation-12 mb-12 cPrimary2 accent-4" size="128">
                <v-img src="@/assets/main-logo-textless.png"></v-img>
            </v-avatar>

            <div></div>

            <v-btn color="grey" href="" outlined large>
                <span class="grey--text text--darken-1 font-weight-bold" style='font-family: "Montserrat", sans-serif !important;'>
                    JOUER MAINTENANT
                </span>
            </v-btn>
        </v-container>

        <div class="py-12"></div>
    </section>

    <section id="features" class="grey lighten-3">
        <div class="py-12"></div>

        <v-container class="text-center">
            <h2 class="display-2 font-weight-bold mb-3" style='font-family: "Montserrat", sans-serif !important;'>CARACTÉRISTIQUES</h2>

            <v-responsive class="mx-auto mb-12" width="56">
                <v-divider class="mb-1"></v-divider>

                <v-divider></v-divider>
            </v-responsive>

            <v-row>
                <v-col v-for="({ icon, title, text }, i) in features" :key="i" cols="12" md="4">
                    <v-card class="py-12 px-4" color="grey lighten-5" flat>
                        <v-theme-provider dark>
                            <div>
                                <v-avatar color="primary" size="88">
                                    <v-icon large v-text="icon"></v-icon>
                                </v-avatar>
                            </div>
                        </v-theme-provider>

                        <v-card-title class="justify-center font-weight-black text-uppercase" style='font-family: "Montserrat", sans-serif !important;' v-text="title"></v-card-title>

                        <v-card-text class="subtitle-1" style='font-family: "Montserrat", sans-serif !important;' v-text="text">
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div class="py-12"></div>
    </section>

    <v-sheet id="contact" color="#333333" dark tag="section" tile>
        <div class="py-12"></div>

        <v-container>
            <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center" style='font-family: "Montserrat", sans-serif !important;'>Contact</h2>

            <v-responsive class="mx-auto mb-12" width="56">
                <v-divider class="mb-1"></v-divider>

                <v-divider></v-divider>
            </v-responsive>

            <v-theme-provider light>
                <v-row>
                    <v-col cols="12">
                        <v-text-field flat label="Name*" solo></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field flat label="Email*" solo></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field flat label="Sujet*" solo></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea flat label="Message*" solo></v-textarea>
                    </v-col>

                    <v-col class="mx-auto" cols="auto">
                        <v-btn color="accent" x-large>
                            Soumettre
                        </v-btn>
                    </v-col>
                </v-row>
            </v-theme-provider>
        </v-container>

        <div class="py-12"></div>
    </v-sheet>

</div>
</template>

<!-- ANCHOR SCRIPT PART -->

<script lang="ts">
// ANCHOR External import
import Vue from "vue";

// ANCHOR Internal import 

export default Vue.extend({
    name: "App",
    components: {

    },
    data() {
        return {
            articles: [{
                    src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
                    title: 'Mobile first & Responsive',
                    text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
                },
                {
                    src: 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
                    title: 'Think outside the box',
                    text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
                },
                {
                    src: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80',
                    title: 'Small changes, big difference',
                    text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
                },
            ],
            features: [{
                    icon: 'mdi-book-open-variant',
                    title: 'Histoire',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
                },
                {
                    icon: 'mdi-google-controller',
                    title: 'Gameplay',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
                },
                {
                    icon: 'mdi-account-group-outline',
                    title: 'Multijoueur',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
                },
            ],
            stats: [
                ['24k', 'Github Stars'],
                ['330+', 'Releases'],
                ['1m', 'Downloads/mo'],
                ['5m', 'Total Downloads'],
            ],
        }
    },
    methods: {

    },
    mounted() {
        const API_URL = ""

    },
});
</script>
