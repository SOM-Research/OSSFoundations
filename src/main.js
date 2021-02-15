//Imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

 //Apex Charts
 import VueApexCharts from "vue3-apexcharts"

//Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//Styles
import './css/style.css'

//Create the Vue app
createApp(App).use(router)
    .use(VueApexCharts)
    .mount('#app')

