<template>
    <nav id="app">
        <v-navigation-drawer v-if="loggedIn" v-model="drawer" app class="indigo">
            <v-layout column align-center="">
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img src="/house2.jpeg">
                    </v-avatar>
                    <p class="white--text subheading mt-1">Rent Ninja</p>
                </v-flex>
            </v-layout>
            <v-list >
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="loggedIn"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Rent</span>
                <span>Ninja</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
                <v-btn color="grey lighten-3" v-if="!loggedIn" rounded :to="{ name:'login' }">Login</v-btn>

                <v-btn text color="grey darken-1" small v-if="loggedIn" @click="logout" rounded :to="{ name:'landing' }">
                    <span>Sign Out</span>
                    <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
        </v-app-bar>

    </nav>
</template>

<script>
    export default {
        name: 'nav-bar',
        data: () => ({
            drawer: false,
            links: [
                {icon: 'dashboard', text: 'Dashboard', route: '/dashboard'},
                {icon: 'folder', text: 'My Houses', route: '/houses'},
                {icon: 'supervisor_account', text: 'Tenants', route: '/tenants'},
                {icon: 'schedule', text: 'Expenses', route: '/expenses'},
            ]
        }),
        computed: {
            loggedIn(){
                return this.$store.getters.loggedIn
            }
        },
        methods: {
            logout(){
                this.$store.dispatch("destroyToken")
                    .then(() =>{
                        // when promise is resolved
                        this.$router.push({ name:'login' })
                    })
            }
        }
    }
</script>