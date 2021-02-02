//Imports
import { createApp } from 'vue'
import App from './App.vue'

/**
 * Apex Charts
 */
 import VueApexCharts from "vue3-apexcharts"
// import ApexCharts from 'apexcharts'

/**
 * Bootstrap
 */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

//Styles
import './css/style.css'


//Create the Vue app
createApp(App)
    // .use(ApexCharts)
     .use(VueApexCharts)
    //.use(VueLodash, { lodash: lodash })
    .mount('#app')

