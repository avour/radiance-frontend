import { createApp } from 'vue'
import "./styles/variables.css"
import "./styles/flex.css"
import "./styles/utils.css"
import "./styles/input.css"
import "./style.css"
import "./styles/fonts.css"

import "solana-wallets-vue/styles.css";
import 'vue3-easy-data-table/dist/style.css';
import 'vue3-toastify/dist/index.css';
import 'vue-universal-modal/dist/index.css';
import 'floating-vue/dist/style.css'

import router from "./router/router"
import App from './App.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import Vue3Toasity from 'vue3-toastify';
import {Tabs, Tab} from 'vue3-tabs-component';
import VueUniversalModal from 'vue-universal-modal';
import { VTooltip } from 'floating-vue'


const app = createApp(App)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('tabs', Tabs);
app.component('tab', Tab);
app.use(Vue3Toasity,
    {
        autoClose: 3000,
        // ...
    })
app.use(VueUniversalModal, {
    teleportTarget: '#modals',
});
app.directive('tooltip', VTooltip);

app.mount('#app')
