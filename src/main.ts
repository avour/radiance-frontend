import { createApp } from 'vue'
import "./styles/variables.css"
import "./styles/flex.css"
import "./styles/utils.css"
import "./styles/input.css"
import "./style.css"
import router from "./router/router"
import App from './App.vue'
import "solana-wallets-vue/styles.css";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'vue3-toastify/dist/index.css';
import Vue3Toasity from 'vue3-toastify';

const app = createApp(App)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(Vue3Toasity,
{
    autoClose: 3000,
    // ...
})
app.mount('#app')
