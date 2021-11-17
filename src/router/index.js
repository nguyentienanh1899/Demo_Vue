import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerPage from '../views/customer/CustomerPage.vue'
import EmployeePage from '../views/employee/EmployeePage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/employee',
    name: "EmployeePage",
    component: EmployeePage
  },
  {
      path: '/customer',
      name: 'CustomerPage',
      component: CustomerPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
