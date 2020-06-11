<template>
    <v-card>
        <v-card-title>
            <h1 class="subtitle-2 grey--text">Payment Records</h1>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <!--        new house-->
            <v-btn x-small left class="mx-2" fab dark color="indigo">
                <!-- dialog -->
                <v-dialog v-model="add_dialog" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-icon dark v-on="on">mdi-plus</v-icon>
                    </template>
                        <v-card>
                            <v-card-title>New payment</v-card-title>
                            <v-card-text>
                                <v-form @submit.prevent="submitPayment" ref="form" v-model="valid">
                                    <v-text-field type="number" v-model="amount" label="Amount" :rules="amountRules"></v-text-field>
                                    <v-btn :disabled="!valid" type="submit" color="success">Submit</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                </v-dialog>
            </v-btn>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items= $store.state.payments
                :search="search"
                loading loading-text="Loading... Please wait"
        >
            <template v-slot:items="props">
                <td>{{ item.date }}</td>
                <td class="text-xs-right">{{ props.item.transaction_type }}</td>
                <td class="text-xs-right">{{ props.item.amount }}</td>
                <td class="text-xs-right">{{ props.item.balance }}</td>
                <td class="text-xs-right">{{ props.item.transaction_id }}</td>
            </template>
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "Payments",
        data () {
            return {
                amount: '',
                tenant_id: '',
                add_dialog: false,
                valid: true,
                id: 4,
                amountRules:[
                    value => !!value || 'amount paid is required',
                    // value => (value || '').match(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) ||'rent amount must be of numerical character only',
                ],
                search: '',
                headers: [
                    {
                        text: 'Date',
                        align: 'left',
                        sortable: false,
                        value: 'date'
                    },
                    { text: 'Transaction Type', value: 'transaction_type' },
                    { text: 'Amount (Ksh.)', value: 'amount' },
                    { text: 'Balance (Ksh.)', value: 'balance' },
                    { text: 'Transaction ID', value: 'transaction_id' }
                ],
            }
        },
        mounted(){
            this.$store.dispatch('getPaymentsByTenantId', this.getIdFromURL());
        },
        methods: {
            // get id
            getIdFromURL(){
                return window.location.pathname.split('/')[2];
            },
            // add a new tenant
            submitPayment(){
                this.$store.dispatch('addPayment',{
                    amount:this.amount,
                    tenant_id: this.getIdFromURL()
                }, this.id).then(()=>{
                    // when the promise has been resolved
                    this.amount = '';
                    this.tenant_id = '';
                    // update on submit
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