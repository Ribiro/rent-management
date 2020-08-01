<template>
    <v-form class="mt-9" @submit.prevent="updateTenant(id)" ref="form" v-model="valid">
        <v-card>
            <v-card-title>Update {{this.$store.state.tenant.name}}</v-card-title>
            <v-card-text>

                <v-text-field v-model="name" label="Tenant Name" :rules="nameRules"></v-text-field>
                <!--                                    <v-col class="d-flex" cols="12" sm="6">-->
<!--                <v-select v-model="house_no" :items="$store.state.vacant_houses" item-text="house_no" item-value="house_no" :menu-props="{ bottom: true, offsetY: true }" label="House no" :rules="houseNoRules"></v-select>-->
                <!--                                    </v-col>-->
                <v-text-field type="number" v-model="phone" label="Phone Number" :rules="phoneRules"></v-text-field>
                <v-text-field type="email" v-model="email" label="Email" :rules="emailRules"></v-text-field>

            </v-card-text>
            <v-card-actions>
                <v-progress-linear
                        :active="$store.state.loading"
                        :indeterminate="$store.state.loading"
                        absolute
                        bottom
                        color="deep-purple accent-4"
                ></v-progress-linear>
                <v-btn small :disabled="!valid" type="submit" color="success">Update</v-btn>
                <v-spacer></v-spacer>
                <v-btn small :to="{ name:'houses' }" color="info" @click="this.$store.state.update_snackbar= false">Back</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    export default {
        name: "UpdateHouse",
        data(){
            return{
                id: this.getIdFromURL(),
                valid: true,
                name: '',
                house_no: '',
                phone: '',
                email: '',
                status: 'vacant',
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
            }
        },
        mounted(){
            this.$store.dispatch('getTenantById', this.id);
            this.$store.dispatch('getHousesByStatus', this.status);
        },
        methods: {
            // get id
            getIdFromURL(){
                return window.location.pathname.split('/')[2];
            },
            // update a house
            updateTenant(id){
                this.$store.dispatch('updateTenant', {
                    id:id,
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                }).then(response => {
                    this.$router.push({name: 'tenants'});
                    // this.$store.state.update_snackbar= true;
                    this.name = '';
                    this.phone = '';
                    this.email = '';
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