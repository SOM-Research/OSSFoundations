//Imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './firebase'; 
//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faGoogle);
library.add(faGithub);


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
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
    

