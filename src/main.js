//Imports
import { createApp } from 'vue'
import App from './App.vue'


/**
 * Bootstrap
 */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Styles
import './css/style.css'

/**
 * D3
 * Generates charts
 */
//const d3 = require("d3");

/**
 * Lodash
 * A JavaScript utility library delivering consistency, modularity, performance, & extras.
 */
// import VueLodash from 'vue-lodash'
 //import lodash from 'lodash'


//Create the Vue app
createApp(App)

    //.use(VueLodash, { lodash: lodash })
    .mount('#app')

