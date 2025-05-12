import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import IMessage from './components/message/index'



createApp(App).use(IMessage).mount('#app')
