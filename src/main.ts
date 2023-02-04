import { createApp } from 'vue'
import "./styles/variables.css"
import "./styles/flex.css"
import "./styles/utils.css"
import './style.css'
import "./styles/input.css"
import "./styles/fonts.css"
import App from './App.vue'

import "solana-wallets-vue/styles.css";
import { SolanaWallets, walletOptions } from "./plugins/SolanaWallet"

createApp(App)
    .use(SolanaWallets, walletOptions)
    .mount('#app')
