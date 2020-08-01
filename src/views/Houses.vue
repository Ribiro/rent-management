<template>
  <div class="houses">
      <v-snackbar  v-model="this.$store.state.update_snackbar" :timeout="4000" top color="success">
          <span>House updated successfully</span>
          <v-btn small text color="white">Close</v-btn>
      </v-snackbar>
<!--    <Navbar></Navbar>-->
    <h1 class="subtitle-2 grey--text">My Houses</h1>

    <v-container  class="my-5">
      <v-layout row class="mx-3 mb-3">
        <v-btn small  color="grey lighten-3 " v-model="sorting" v-on:click="sortBy('status')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">Sort</span>
        </v-btn>
        <v-spacer></v-spacer>
<!--        new house-->
        <v-btn x-small right class="mx-2" fab dark color="indigo">
          <!-- dialog -->
          <v-dialog v-model="add_dialog" max-width="600px">
            <template v-slot:activator="{ on }">
              <v-icon dark v-on="on">mdi-plus</v-icon>
            </template>
            <v-card>
              <v-card-title>Add house</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitHouse" ref="form" v-model="valid">
                  <v-text-field v-model="house_no" label="house_no" :rules="houseNoRules"></v-text-field>
                  <v-text-field type="number" v-model="rent_amount" label="rent_amount" :rules="rentAmountRules"></v-text-field>
                  <v-btn :disabled="!valid" type="submit" color="success">Submit</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-btn>
      </v-layout>
      <v-card flat class="px-3" v-for="(house, index) in $store.state.houses" :key="index">
        <v-layout row wrap :class="`pa-3 house ${house.status}`">
          <v-flex xs6 md3 >
            <div class="caption grey--text">House No</div>
            <div>{{house.house_no}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Rent Amount</div>
            <div>{{house.rent_amount}}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div>
              <v-chip small :class="`${house.status} white--text caption my-2`">{{house.status}}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text align-center">Actions</div>
              <div>
                  <v-btn  :to="{name: 'update_house', params:{id:house.id}}" x-small text>
                      <v-icon small>mdi-pencil</v-icon>
                  </v-btn>

<!--                delete-->
                    <!-- dialog -->
                    <v-dialog v-model="delete_dialog[index]" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-icon class="black--text" right small  v-on="on">mdi-delete</v-icon>
                        </template>
                        <v-card>
                            <v-card-title class="text-uppercase grey--text font-weight-light">Are you sure to delete {{house.house_no}}?</v-card-title>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn right color="red darken-1" text v-on:click="removeHouse(house.id)">
                                    Agree
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
              </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>
<script>
  // import Navbar from "../components/Navbar";
  // import store from "../store/store";

  export default {
    components:{
      // Navbar
    },
    data(){
      return {
          houses:this.$store.state.houses,
        snackbar: false,
        valid: true,
        add_dialog:false,
        update_dialog: [],
        delete_dialog: [],
        showModal: false,
        house_no: '',
        rent_amount: '',
        alignment: 'center',
        justify:'center',
        houseNoRules:[
          value => !!value || 'house no. is required'
        ],
        rentAmountRules:[
          value => !!value || 'rent amount is required',
          // value => (value || '').match(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) ||'rent amount must be of numerical character only',
        ],
        sorting: false
      }
    },
    mounted(){
        this.$store.dispatch('getHouses')
    },
    computed: {
        // sorted(){
        //     return this.$store.getters.sorted_houses
        // }
    },
    methods: {
        sortBy (sortKey) {
            this.$store.commit('sortHouses', sortKey);
        },
      // add a new house
      submitHouse(){
        this.$store.dispatch('addHouse',{
          house_no:this.house_no,
          rent_amount:this.rent_amount,
        }).then(()=>{
          // when the promise has been resolved
          this.house_no = '';
          this.rent_amount = '';
          this.add_dialog = false ;//close the dialog
          this.$store.dispatch('getHouses');
          console.log(status)
        }).catch(()=>{
          console.log('did not add')
        })
      },
      // delete a house
      removeHouse(id) {
        this.$store.dispatch('deleteHouse', id);
        this.delete_dialog=false
      },

      // get single house
      getHouse(id){
          this.$store.dispatch('getHouseById', id)
      },
    }
  }
</script>
<style>
  .house.vacant{
    border-left: 4px solid #3cd1c2;
  }
  .house.occupied{
    border-left: 4px solid orange;
  }
  .v-chip.vacant{
    background: #3cd1c2 !important;
  }
  .v-chip.occupied{
    background: orange !important;
  }
</style>