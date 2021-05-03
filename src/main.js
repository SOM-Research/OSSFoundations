//Imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './firebase'; 
//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faGoogle, faGithub, faBars);


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
    

