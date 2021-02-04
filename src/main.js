//Imports
import { createApp } from 'vue'
import App from './App.vue'

 //Apex Charts
 import VueApexCharts from "vue3-apexcharts"

//Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//Styles
import './css/style.css'

//Create the Vue app
createApp(App)
    // .use(ApexCharts)
     .use(VueApexCharts)
    //.use(VueLodash, { lodash: lodash })
    .mount('#app')

