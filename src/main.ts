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

const app = createApp(App)
app.use(router)
app.use(SolanaWallets, walletOptions)
app.mount('#app')



createApp(App)

    .mount('#app')
