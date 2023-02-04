import { createApp } from 'vue'
import "./styles/variables.css"
import "./styles/flex.css"
import "./styles/utils.css"
import "./styles/input.css"
import "./style.css"
import router from "./router/router"
import App from './App.vue'

const app = createApp(App)
app.use(router)

app.mount('#app')
