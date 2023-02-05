import { createApp } from 'vue'
import "./styles/variables.css"
import "./styles/flex.css"
import "./styles/utils.css"
import "./styles/input.css"
import "./style.css"
import router from "./router/router"
import App from './App.vue'

import "solana-wallets-vue/styles.css";
import { SolanaWallets, walletOptions } from "./plugins/SolanaWallet"
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App)
app.use(router)
app.use(SolanaWallets, walletOptions)
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app')
