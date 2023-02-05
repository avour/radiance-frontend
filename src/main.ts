import { createApp } from 'vue'
import "./styles/variables.css"
import "./styles/flex.css"
import "./styles/utils.css"
import "./styles/input.css"
import "./style.css"
import router from "./router/router"
import App from './App.vue'

import "solana-wallets-vue/styles.css";
import 'vue3-toastify/dist/index.css';
import Vue3Toasity from 'vue3-toastify';
import 'vue-universal-modal/dist/index.css';

import VueUniversalModal from 'vue-universal-modal';

const app = createApp(App)
app.use(router)
app.use(Vue3Toasity,
    {
        autoClose: 3000,
        // ...
    })

app.use(VueUniversalModal, {
    teleportTarget: '#modals',
});

app.mount('#app')
