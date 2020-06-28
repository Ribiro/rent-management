<template>
    <v-form @submit.prevent="updateHouse(id)" ref="form" v-model="valid">
        <v-card>
            <v-card-title>Update {{this.$store.state.house.house_no}}</v-card-title>
            <v-card-text>

                    <v-text-field v-model="house_no" label="new house number" :rules="houseNoRules"></v-text-field>
                    <v-text-field type="number" v-model="rent_amount" label="new rent amount" :rules="rentAmountRules"></v-text-field>

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
                house_no: '',
                rent_amount: '',houseNoRules:[
                    value => !!value || 'house no. is required'
                ],
                rentAmountRules:[
                    value => !!value || 'rent amount is required',
                    // value => (value || '').match(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) ||'rent amount must be of numerical character only',
                ],
            }
        },
        mounted(){
            this.$store.dispatch('getHouseById', this.id);
            this.$store.state.update_snackbar= false;
        },
        methods: {
            // get id
            getIdFromURL(){
                return window.location.pathname.split('/')[2];
            },
            // update a house
            updateHouse(id){
                this.$store.dispatch('updateHouse', {
                    id:id,
                    house_no: this.house_no,
                    rent_amount: this.rent_amount,
                }).then(response => {
                    this.$router.push({name: 'houses'});
                    this.$store.state.update_snackbar= true;
                    this.house_no = '';
                    this.rent_amount = '';
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