<template>
    <v-layout>
        <v-flex>
            <v-card class="text-center">
                <v-img
                        class="white--text align-end"
                        height="400px"
                        src="/imagees.jpg"
                >
                    <v-card-title >Rental Management Ninja</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0 blue-grey--text">About App</v-card-subtitle>

                <v-card-text class="text--primary">
                    <div>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-footer>
                        <v-footer dark padless>
                            <v-card  tile class="indigo lighten-1 white--text text-center">
                                <v-card-text>
                                    <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                                        <v-icon size="24px">{{ icon }}</v-icon>
                                    </v-btn>
                                </v-card-text>

                                <v-card-text class="white--text pt-0">
                                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-text class="white--text">
                                    {{ new Date().getFullYear() }} — <strong>@developer: Dennis Ribiro</strong>
                                </v-card-text>
                            </v-card>
                        </v-footer>
                    </v-footer>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>

</template>

<script>
    export default {
        name: "Landing",
        data: () => ({
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }),
    }
</script>

<style scoped>
</style>