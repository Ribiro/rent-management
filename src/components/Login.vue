<template>
    <div>
        <v-card width="400" class="mx-auto mt-5">
            <v-alert type="error" class="mb-4" v-if="errorMessage">
                {{ errorMessage }}
            </v-alert>

            <v-card-title class="mt-5">
                <h4 class="grey--text">Login Form</h4>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="email" :rules="emailRules" label="email" prepend-icon="mdi-account-circle"></v-text-field>
                    <v-text-field
                            v-model="password"
                            label="password"
                            :type="showPassword ? 'text': 'password' "
                            prepend-icon="mdi-lock"
                            :append-icon="showPassword ?  'mdi-eye': 'mdi-eye-off' "
                            @click:append="showPassword=!showPassword"
                            :rules="passwordRules"></v-text-field>
                </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-progress-linear
                        :active="$store.state.loading"
                        :indeterminate="$store.state.loading"
                        absolute
                        bottom
                        color="deep-purple accent-4"
                ></v-progress-linear>
                <v-btn small :disabled="!valid" @click="login" color="success">Submit</v-btn>
                <v-spacer></v-spacer>
                <v-btn small :to="{ name:'register' }" color="info">Register</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name:'Login',
        data(){
            return{
                showPassword:false,
                valid:true,
                email:'',
                password:'',
                errorMessage:'',
                emailRules:[
                    value => !!value || 'Email is required',
                    value => value.indexOf('@') !== 0 || 'Email should have a username',
                    value => value.includes('@') || 'Email should include an @ symbol',
                    value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain',
                    value => value.indexOf('.') <= value.length -3 || 'Email should contain a valid domain extension'
                ],
                passwordRules:[
                    value => !!value || 'Password is required'
                ]
            }
        },
        methods:{
            login(e){
                e.preventDefault()
                this.$store.dispatch('retrieveToken',{
                    email:this.email,
                    password:this.password
                }).then(()=>{
                    this.$router.push({name:'dashboard'})
                }).catch(error=>{
                    this.errorMessage = error.response.data.message
                })
            }
        }
    }
</script>