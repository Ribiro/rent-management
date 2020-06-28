<template>
  <div>
<!--    <Navbar></Navbar>-->
    <h1 class="subtitle-1 grey--text">Dashboard</h1>

    <v-container class="my-5">
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3>
                <v-card flat class="text-center ma-3 " height="100%">
                    <v-card-title>

                    </v-card-title>

                    <v-card-text >
                        <v-progress-circular
                                :rotate="360"
                                :size="70"
                                :width="12"
                                :value="value"
                                color="teal"
                        >
                            {{ value }}
                        </v-progress-circular>
                        <v-spacer></v-spacer>
                        <span class="title font-weight-light">Ksh. 50000</span>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="text-center">
                            <v-icon small left>date_range</v-icon>
                            <span>Rent Paid</span>
                        </div>
                    </v-card-actions>
                </v-card>

            </v-flex>

            <v-flex xs12 sm6 md4 lg3>
                <v-card flat class="text-center ma-3 " height="100%">
                    <v-card-title>
                    </v-card-title>

                    <v-card-text>
                        <v-progress-circular
                                :rotate="90"
                                :size="70"
                                :width="12"
                                :value="value"
                                color="red"
                        >
                            {{ value }}
                        </v-progress-circular>
                        <v-spacer></v-spacer>
                        <span class="title font-weight-light">Ksh. 20000</span>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="text-center">
                            <v-icon small left>date_range</v-icon>
                            <span>Unpaid Rent</span>
                        </div>
                    </v-card-actions>
                </v-card>

            </v-flex>

            <v-flex xs12 sm6 md4 lg3>
                <v-card flat class="text-center ma-3 " height="100%">
                    <v-card-title>
                        <!--                  <v-icon right small v-on:click="removeHouse(house.id)">mdi-delete</v-icon>-->
                    </v-card-title>

                    <v-card-text class="text-center">
                        <v-icon left x-large color="green">mdi-store</v-icon>
                        <v-spacer></v-spacer>
                        <span class="title font-weight-light">Ksh. 10000</span>
                    </v-card-text>
                    <v-card-actions>
                        <div class="text-center">
                            <v-icon small left>history</v-icon>
                            <span>Expenses</span>
                        </div>
                    </v-card-actions>
                </v-card>

            </v-flex>
            <v-flex xs12 sm6 md4 lg3>
                <v-card flat class="text-center ma-3 " height="100%">
                    <v-card-title>
                        <!--                  <v-icon right small v-on:click="removeHouse(house.id)">mdi-delete</v-icon>-->
                    </v-card-title>

                    <v-card-text class="headline font-weight-bold">
                        <v-icon left x-large color="green">mdi-home</v-icon>
                        <v-spacer></v-spacer>
                        <span class="title font-weight-light">10</span>
                    </v-card-text>
                    <v-card-actions>
                        <div class="text-center">
                            <v-icon small left>history</v-icon>
                            <span>Vacant Houses</span>
                        </div>
                    </v-card-actions>
                </v-card>

            </v-flex>
            <v-flex xs12 sm12 md12 lg12 >
                <v-card
                        class="mx-auto text-center mt-5"
                        color="indigo lighten-1"
                        dark
                >
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline
                                    :value="value2"
                                    color="rgba(255, 255, 255, .7)"
                                    height="100"
                                    padding="24"
                                    stroke-linecap="round"
                                    smooth
                            >
                                <template v-slot:label="item">
                                    Ksh. {{ item.value }}
                                </template>
                            </v-sparkline>
                        </v-sheet>
                    </v-card-text>

                    <v-card-text>
                        <div class="display-1 font-weight-thin">Rent Payment Last 1 month</div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="justify-center">
                        <v-btn block text>Go to Report</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Navbar from "../components/Navbar";

export default {
  name: 'Dashboard',
  components:{
    // Navbar
  },
    data () {
        return {
            interval: {},
            value: 0,
            value2: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
            ],
        }
    },
    beforeDestroy () {
        clearInterval(this.interval)
    },
    mounted () {
        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0)
            }
            this.value += 10
        }, 1000)
    },
}
</script>
<style scoped>
    .v-progress-circular {
        margin: 1rem;
    }
</style>
