import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Houses from '../views/Houses'
import Tenants from "../views/Tenants";
import Login from "../components/Login";
import Register from "../components/Register";
// import Logout from "../components/Logout";
import Landing from "../components/Landing";
import Payments from "../views/Payments";
import Expenses from "../components/Expenses";
import UpdateHouse from "../components/UpdateHouse";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/houses',
    name: 'houses',
    component: Houses,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tenants',
    name: 'tenants',
    component: Tenants,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: Expenses,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/payments/:id',
    name: 'payments',
    component: Payments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/house/:id',
    name: 'update_house',
    component: UpdateHouse,
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
