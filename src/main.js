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

/**
 * D3
 * Generates charts
 */
import 'd3'
import 'c3'
//import c3 from './plugins/c3-0.7.20/c3.min.js'


/**
 * Lodash
 * A JavaScript utility library delivering consistency, modularity, performance, & extras.
 */
// import VueLodash from 'vue-lodash'
//import lodash from 'lodash'


//Create the Vue app
createApp(App)
    // .use(ApexCharts)
     .use(VueApexCharts)
    //.use(VueLodash, { lodash: lodash })
    .mount('#app')

