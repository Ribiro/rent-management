<template>
    <div id="tenants">
<!--        <NavBar></NavBar>-->
        <v-snackbar  v-model="snackbar" :timeout="4000" top color="success">
            <span>Tenant successfully added {{this.toUpdate}}</span>
            <v-btn small text color="white">Close</v-btn>
        </v-snackbar>

        <v-container  class="my-5">
            <v-layout row class="mx-3 mb-3">
                <h1 class="subtitle-2 grey--text">Tenants</h1>
                <v-spacer></v-spacer>
                <!--        new house-->
                <v-btn small right class="mx-2" fab dark color="indigo">
                    <!-- dialog -->
                    <v-dialog v-model="add_dialog" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-icon dark v-on="on">mdi-plus</v-icon>
                        </template>
                        <v-card>
                            <v-card-title>New Tenant</v-card-title>
                            <v-card-text>
                                <v-form @submit.prevent="submitTenant" ref="form" v-model="valid">
                                    <v-text-field v-model="name" label="Tenant Name" :rules="nameRules"></v-text-field>
<!--                                    <v-col class="d-flex" cols="12" sm="6">-->
                                    <v-select v-model="house_no" :items="$store.state.vacant_houses" item-text="house_no" item-value="house_no" :menu-props="{ bottom: true, offsetY: true }" label="House no" :rules="houseNoRules"></v-select>
<!--                                    </v-col>-->
                                    <v-text-field type="number" v-model="phone" label="Phone Number" :rules="phoneRules"></v-text-field>
                                    <v-text-field type="email" v-model="email" label="Email" :rules="emailRules"></v-text-field>
                                    <v-btn :disabled="!valid" type="submit" color="success">Submit</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-btn>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="(tenant, index) in $store.state.tenant" :key="index">
                    <v-card flat class="text-center ma-3">
                        <v-card-title>
                            <v-icon left>mdi-account</v-icon>
                            <span class="title font-weight-light">{{tenant.name}}</span>
                            <v-spacer></v-spacer>
                            <v-btn  :to="{name: 'update_tenant', params:{id:tenant.id}}" x-small text>
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            <!--                delete-->
                                <!-- dialog -->
                                <v-dialog v-model="delete_dialog[index]" max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-icon small class="black--text"  v-on="on">mdi-delete</v-icon>
                                    </template>
                                    <v-card>
                                        <v-card-title class="text-uppercase grey--text font-weight-light">Are you sure to remove {{tenant.name}}?</v-card-title>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn right color="red darken-1" text v-on:click="removeTenant(tenant.house_no)">
                                                Agree
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <!--                  <v-icon right small v-on:click="removeHouse(house.id)">mdi-delete</v-icon>-->
                        </v-card-title>

                        <v-card-text class="headline font-weight-bold">
                            <v-icon small left>house</v-icon>
                            <span class="title font-weight-light">{{tenant.house_no}}</span>
                            <v-btn :to="{name: 'payments', params:{id:tenant.id}}" text color="deep-purple accent-4">Payments Details</v-btn>
                        </v-card-text>

                        <v-card-actions>
                            <div class="text-center">
                                <div>
                                    <v-icon small left>phone</v-icon>
                                    <span class="   ">{{tenant.phone}}</span>
                                </div>
                                <div>
                                    <v-icon small left>mdi-email</v-icon>
                                    <span class="   ">{{tenant.email}}</span>
                                </div>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
    // import NavBar from "../components/Navbar";
    export default {
        name: "Tenants",
        // components: {NavBar},
        data(){
            return {
                id: 7,
                snackbar: false,
                valid: true,
                add_dialog:false,
                delete_dialog:[],
                name: '',
                house_no: '',
                phone: '',
                email: '',
                status: 'vacant',
                occupied: 'occupied',
                is_occupied: 1,
                notOccupied: 2,
                house_to_update: '',
                noneHouseNo: '',
                nameRules:[
                    value => !!value || 'tenant name is required'
                ],
                houseNoRules:[
                    value => !!value || 'house no. is required'
                ],
                phoneRules:[
                    value => !!value || 'phone number is required',
                    // value => (value || '').match(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) ||'rent amount must be of numerical character only',
                ],
                emailRules:[
                    value => !!value || 'Email is required',
                    value => value.indexOf('@') !== 0 || 'Email should have a username',
                    value => value.includes('@') || 'Email should include an @ symbol',
                    value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain',
                    value => value.indexOf('.') <= value.length -3 || 'Email should contain a valid domain extension'
                ],
                sorting: false,
            }
        },
        mounted(){
            this.$store.dispatch('getTenantByIsOccupied', this.is_occupied);
            this.$store.dispatch('getHousesByStatus', this.status);
        },
        computed: {
            toUpdate(){
                return this.$store.state.house_by_no.id
            }
        },
        methods: {
            // add a new tenant
            submitTenant(){
                this.$store.dispatch('addTenant',{
                    name:this.name,
                    house_no:this.house_no,
                    phone:this.phone,
                    email:this.email,
                    is_occupied: this.is_occupied
                }).then(()=>{
                    // when the promise has been resolved
                    // set house's status to occupied
                    // this.$store.dispatch('getHouseByHouseNo', this.house_no);
                    // update the status to occupied
                    this.updateHouseStatus(this.house_no);
                    // refresh tenants list
                    this.$store.dispatch('getTenantByIsOccupied', this.is_occupied);
                    // reset name, house, phone, and email variables
                    this.name = '';
                    this.house_no = '';
                    this.phone = '';
                    this.email = '';
                    this.add_dialog = false ;//close the dialog
                    this.snackbar = true; //show the snackbar
                    // refresh vacant houses
                    this.$store.dispatch('getHousesByStatus', this.status);
                    console.log(status)
                }).catch(()=>{
                    // when the promise is unresolved
                    console.log('something went wrong')
                })
            },
            // update the house status
            updateHouseStatus(house_no){
                this.$store.dispatch('updateHouseStatus', {
                    house_no:house_no,
                    status: this.occupied
                }).then(response => {
                    // this.$router.push({name: 'houses'});
                    // this.$store.state.update_snackbar= true;
                    // this.house_no = '';
                    // this.rent_amount = '';
                    console.log(response.data)
                }).catch(()=>{
                    console.log('did not update')
                })
            },
            // update the house status
            updateTenantIsOccupied(house_no){
                this.$store.dispatch('updateTenantIsOccupied', {
                    house_no: house_no,
                    is_occupied: this.notOccupied
                }).then(response => {
                    console.log(response.data)
                }).catch(()=>{
                    console.log('did not update')
                })
            },
            removeTenant(house_no){
                this.$store.dispatch('updateHouseStatus', {
                    house_no:house_no,
                    status: this.status
                }).then(response => {
                    // this.$router.push({name: 'houses'});
                    // this.$store.state.update_snackbar= true;
                    // this.house_no = '';
                    // this.rent_amount = '';
                    this.house_to_update = house_no;
                    this.updateTenantIsOccupied(this.house_to_update);
                    this.delete_dialog=false;
                    // refresh tenants list
                    this.$store.dispatch('getTenantByIsOccupied', this.is_occupied);
                    console.log(response.data)
                }).catch(()=>{
                    console.log('did not update')
                })
            },
        }
    }
</script>

<style scoped>

</style>