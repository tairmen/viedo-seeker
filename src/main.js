import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Axios from "axios";
import vuetify from './plugins/vuetify';

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
