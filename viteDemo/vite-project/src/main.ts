import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


let app = createApp(App)
app.use(ElementPlus)
.mount('#app');
// app.use(ElementPlus)
axios.get("/api/test1").then((res) => {
  console.log(res);
});
axios.get("/api/test2").then((res) => {
  console.log(res);
});
