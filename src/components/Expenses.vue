<template>
    <div id="tenants">
        <!--        <NavBar></NavBar>-->
        <v-snackbar  v-model="snackbar" :timeout="4000" top color="success">
            <span>Expense successfully added</span>
            <v-btn small text color="white">Close</v-btn>
        </v-snackbar>

        <v-container  class="my-5">
            <v-layout row class="mx-3 mb-3">
                <h1 class="subtitle-2 grey--text">All Expenses</h1>
                <!--        new expense-->
                <v-btn x-small right class="mx-2" fab dark color="indigo">
                    <!-- dialog -->
                    <v-dialog v-model="add_dialog" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-icon dark v-on="on">mdi-plus</v-icon>
                        </template>
                        <v-card>
                            <v-card-title>Add Expense</v-card-title>
                            <v-card-text>
                                <v-form @submit.prevent="submitExpense" ref="form" v-model="valid">
                                    <v-text-field v-model="description" label="Expense Description" :rules="DescriptionRules"></v-text-field>
                                    <v-text-field type="number" v-model="amount" label="Amount" :rules="AmountRules"></v-text-field>
                                    <v-btn :disabled="!valid" type="submit" color="success">Submit</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-layout>
            <v-layout row wrap>
                <v-flex >
                    <v-data-table
                            :headers="headers"
                            :items= $store.state.expenses
                            :search="search"
                            loading loading-text="Loading... Please wait"
                    >
                        <template v-slot:items="props">
                            <td class="text-xs-right">{{ props.item.description }}</td>
                            <td class="text-xs-right">{{ props.item.amount }}</td>
                            <td class="text-xs-right">{{ props.item.date }}</td>
                        </template>
                        <template v-slot:no-results>
                            <v-alert :value="true" color="error" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
    export default {
        name: "Expenses",
        data () {
            return {
                add_dialog: false,
                description: '',
                amount: '',
                valid: true,
                snackbar: false,
                descriptionRules:[
                    value => !!value || 'expense description is required'
                ],
                amountRules:[
                    value => !!value || 'phone number is required',
                    // value => (value || '').match(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) ||'rent amount must be of numerical character only',
                ],
                search: '',
                headers: [
                    { text: 'Description', value: 'description' },
                    { text: 'Amount (Ksh.)', value: 'amount' },
                    { text: 'Date', value: 'date' },
                ],
            }
        },
        mounted(){
            this.$store.dispatch('getExpenses');
        },
        methods: {
            // add a new expense
            submitExpense(){
                this.$store.dispatch('addExpense',{
                    description:this.description,
                    amount:this.amount
                }).then(()=>{
                    // when the promise has been resolved
                    this.description = '';
                    this.amount = '';
                    this.add_dialog = false ;//close the dialog
                    this.snackbar = true; //show the snackbar
                    console.log(status)
                }).catch(()=>{
                    // when the promise is unresolved
                    console.log('something went wrong')
                })
            },
        }
    }
</script>

<style scoped>

</style>