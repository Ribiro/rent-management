import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
axios.defaults.baseURL = 'https://ribiro-rent.herokuapp.com/api/v1'; // production
// axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1'; //development

export default new Vuex.Store({
  state: {
      token: localStorage.getItem('access_token') || null,
      loading:false,
      update_snackbar: false,
      houses:[],
      house:[],
      house_by_no:[],
      vacant_houses:[],
      house_no:'',
      rent_amount:'',
      tenants: [],
      tenant:[],
      payments: [],
      expenses: [],
      // sort_ascending: true,
      sort_by: 'id',
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    // sorted_houses(state){
    //   const houses = [this.state.houses].sort((a,b) => {
    //       if(a[state.sort_by] > b[state.sort_by]){return 1}
    //       if(a[state.sort_by] < b[state.sort_by]){return -1}
    //       return houses
    //
    //   });
    // }
  },
  mutations: {
    retrieveToken(state, token){
      state.token = token
    },
    destroyToken(state){
      state.token = null
    },

    // houses section
    updateHousesList(state, house){
        state.houses.push({
            house_no: house.house_no,
            rent_amount: house.rent_amount
        })
    },
    setHouses(state,payload){
        state.houses = payload
    },
    setHouse(state, payload) {
        state.house = payload
    } ,
    setHouseByNo(state, payload) {
      state.house_by_no = payload
    } ,
    setHouseByStatus(state, payload){
        state.vacant_houses = payload
    },
    deleteHouse(state, id) {
        const index = state.houses.findIndex(house => house.id === id)
        state.houses.splice(index, 1)
    },
    updateHouse(state, house){
        const index = this.state.houses.findIndex(house => house.id === house.id)
        state.houses.splice(index, {
            'id': house.id,
            'house_no': house.house_no,
            'rent_amount': house.rent_amount,
            'status': house.status
        })
    },
    updateHouseStatus(state, house){
      const index = this.state.houses.findIndex(house => house.id === house.id);
      state.houses.splice(index, {
          'id': house.id,
          'house_no': house.house_no,
          'rent_amount': house.rent_amount,
          'status': house.status
      })
    },

  // tenants section
    updateTenantsList(state, tenant){
      state.tenants.push({
          name: tenant.name,
          phone: tenant.phone,
          email: tenant.email,
          house_no: tenant.house_no,
          is_occupied: tenant.is_occupied
      })
    },
    setTenants(state,payload){
      state.tenants = payload
    },
    setTenant(state, payload) {
      state.tenant = payload
    } ,
    updateTenant(state, tenant){
      const index = this.state.tenants.findIndex(house => house.id === house.id);
      state.tenants.splice(index, {
          'id': tenant.id,
          'name': tenant.name,
          'phone': tenant.phone,
          'email': tenant.email,
          'house_no': tenant.house_no,
          'is_occupied': tenant.is_occupied
      })
    },
    updateTenantIsOccupied(state, tenant){
      const index = this.state.tenants.findIndex(house => house.id === house.id);
      state.tenants.splice(index, {
          'id': tenant.id,
          'name': tenant.name,
          'phone': tenant.phone,
          'email': tenant.email,
          'house_no': tenant.house_no,
          'is_occupied': tenant.is_occupied
      })
    },
    deleteTenant(state, id) {
      const index = state.tenants.findIndex(tenant => tenant.id === id);
      state.tenants.splice(index, 1)
    },
      // payments section
    setPaymentsByTenantId(state, payload){
      state.payments = payload
    },

    updatePaymentsList(state, payment){
      state.payments.push({
          amount: payment.amount,
          balance: payment.balance,
          date: payment.date,
          transaction_id: payment.transaction_id,
          transaction_type: payment.transaction_type
      })
    },

    // expenses mutations
    updateExpensesList(state, expense){
      state.expenses.push({
          amount: expense.amount,
          description: expense.description,
          date: expense.date,
      })
    },
    setExpenses(state,payload){
      state.expenses = payload
    },
      // sort houses
    sortHouses(state, sortKey) {
      console.log('running mutation');
      const houses = this.state.houses;
      houses.sort((a, b) => {
          let compare = 0;
          if (a[sortKey] < b[sortKey]) {
              compare = -1;
          }
          else if (b[sortKey] < a[sortKey]) {
              compare = -1;
          }
          return compare;
      });
      state.houses = houses;
    }
  },
  actions: {
    register(context, data){
      return new Promise((resolve, reject) =>{
        axios.post('/users', {
          username: data.username,
          phone: data.phone,
          email: data.email,
          password: data.password
        })
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    },
    retrieveToken(context, credentials){

      return new Promise((resolve, reject) =>{
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password
        })
            .then(response => {
              const token = response.data.acess_token;

              localStorage.setItem('access_token', token);
              context.commit('retrieveToken', token);
              resolve(response)
              // console.log(token)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
      })
    },
    destroyToken(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer' + context.state.token;

      if (context.getters.loggedIn){
        return new Promise((resolve, reject) =>{
          axios.post('/logout')
              .then(response => {
                localStorage.removeItem('access_token');
                context.commit('destroyToken');
                resolve(response)
                // console.log(token)
              })
              .catch(error => {
                localStorage.removeItem('access_token');
                context.commit('destroyToken');
                reject(error)
              })
        })
      }
    },
      // houses section
      // add a new house
  addHouse(context,house){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;

      return new Promise((resolve,reject)=>{
          axios.post('/houses', {
              house_no: house.house_no,
              rent_amount: house.rent_amount
          })
              .then(response=>{
                  console.log(response.data);
                  context.commit("updateHousesList",response.data);
                  resolve()
              })
              .catch(error=>{
                  console.log(error);
                  reject()
              })
      })

  },
  // get houses
  getHouses(context){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/houses')
              .then(response=>{
                  context.commit('setHouses',response.data.houses);
                  resolve(resolve);
                  console.log(response);
                  // console.log(this.houses)
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  // get house by id
  getHouseById(context, id){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/houses/' + id)
              .then(response=>{
                  context.commit('setHouse',response.data);
                  console.log(response)
                  resolve(resolve);
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  // get house by house number
  getHouseByHouseNo(context, house_no){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/house/' + house_no)
              .then(response=>{
                  context.commit('setHouseByNo',response.data);
                  console.log(response)
                  resolve(resolve);
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  // get houses by status
  getHousesByStatus(context, status){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/houses/' + status)
              .then(response=>{
                  context.commit('setHouseByStatus',response.data);
                  console.log(response);
                  resolve(resolve);
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  deleteHouse(context, id) {
      axios.delete('/houses/' + id)
      // eslint-disable-next-line no-unused-vars
          .then(response => {
              context.commit('deleteHouse', id)
          })
          .catch(error => {
              console.log(error)
          })
  },
  updateHouse(context, house){
        axios.put('/houses/' + house.id, {
            house_no: house.house_no,
            rent_amount: house.rent_amount,
            // status: house.status
        }).then(response =>{
            context.commit('updateHouse', response.data);
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
  },
  updateHouseStatus(context, house){
      axios.put('/house/' + house.house_no, {
          status: house.status
      }).then(response =>{
          context.commit('updateHouseStatus', response.data);
          console.log(response.data)
      }).catch(error => {
          console.log(error)
      })
  },

  // tenants section
  // add a new tenant
  addTenant(context,tenant){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;

      return new Promise((resolve,reject)=>{
          axios.post('/tenants', {
              name: tenant.name,
              phone: tenant.phone,
              email: tenant.email,
              house_no: tenant.house_no,
              is_occupied: tenant.is_occupied
          })
              .then(response=>{
                  console.log(response.data);
                  context.commit("updateTenantsList",response.data);
                  resolve()
              })
              .catch(error=>{
                  console.log(error);
                  reject()
              })
      })

  },
  getTenants(context){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/tenants')
              .then(response=>{
                  context.commit('setTenants',response.data.tenants);
                  resolve(resolve);
                  console.log(response)
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  // get house by id
  getTenantById(context, id){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/tenants/' + id)
              .then(response=>{
                  context.commit('setTenant',response.data);
                  console.log(response);
                  resolve(resolve);
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  // get tenants by isOccupied
  getTenantByIsOccupied(context, is_occupied){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/tenant/' + is_occupied)
              .then(response=>{
                  context.commit('setTenant',response.data);
                  console.log(response);
                  resolve(resolve);
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  updateTenant(context, tenant){
      axios.put('/tenants/' + tenant.id, {
          name: tenant.name,
          phone: tenant.phone,
          email: tenant.email,
      }).then(response =>{
          context.commit('updateTenant', response.data);
          console.log(response.data)
      }).catch(error => {
          console.log(error)
      })
  },
   updateTenantIsOccupied(context, tenant){
        axios.put('/tenant/' + tenant.house_no, {
          is_occupied: tenant.is_occupied
        }).then(response =>{
          context.commit('updateTenantIsOccupied', response.data);
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
   },
  deleteTenant(context, id) {
      axios.delete('/tenants/' + id)
      // eslint-disable-next-line no-unused-vars
          .then(response => {
              context.commit('deleteTenant', id)
          })
          .catch(error => {
              console.log(error)
          })
  },
      // payments section
  addPayment(context,payment){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;

      return new Promise((resolve,reject)=>{
          axios.post('/payments', {
              amount: payment.amount,
              tenant_id: payment.tenant_id
          })
              .then(response=>{
                  console.log(response.data);
                  context.commit("updatePaymentsList",response.data);
                  resolve()
              })
              .catch(error=>{
                  console.log('there is some error');
                  console.log(error);
                  reject()
              })
      })

  },
  // get houses by status
  getPaymentsByTenantId(context, tenant_id){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/payments/' + tenant_id)
              .then(response=>{
                  context.commit('setPaymentsByTenantId',response.data);
                  console.log(response);
                  resolve(resolve);
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  // expenses section
  addExpense(context,expense){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;

      return new Promise((resolve,reject)=>{
          axios.post('/expenses', {
              description: expense.description,
              amount: expense.amount
          })
              .then(response=>{
                  console.log(response.data);
                  context.commit("updateExpensesList",response.data);
                  resolve()
              })
              .catch(error=>{
                  console.log('there is some error');
                  console.log(error);
                  reject()
              })
      })

  },
  getExpenses(context){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{

          axios.get('/expenses')
              .then(response=>{
                  context.commit('setExpenses',response.data);
                  resolve(resolve);
                  console.log(response)
              })
              .catch(error=>{
                  console.log(error);
                  reject(error)
              })
      })

  },
  },
  modules: {
  }
})
