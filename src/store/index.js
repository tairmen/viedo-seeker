import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {
      name: "user",
      email: "email",
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    register_request(state) {
      state.status = "verification";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://api.videoseeker.net/authentication/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            // console.log(resp)
            const token = resp.data.access;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("register_request");
        // console.log(user);
        axios({
          url: "https://api.videoseeker.net/authentication/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            console.log(resp);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    email_verification({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        let reqData = {
          email: user.email,
          verification_code: user.verification_code,
        };
        axios({
          url:
            "https://api.videoseeker.net/authentication/register/email-verification",
          data: reqData,
          method: "POST",
        })
          .then((resp) => {
            let authUser = {
              email: user.email,
              password: user.password,
            };
            axios({
              url: "https://api.videoseeker.net/authentication/login",
              data: authUser,
              method: "POST",
            })
              .then((resp) => {
                // console.log(resp)
                const token = resp.data.access;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success", token);
                resolve(resp);
              })
              .catch((err) => {
                commit("auth_error", err);
                localStorage.removeItem("token");
                reject(err);
              });
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    getCurrentUser: (state) => {
      return state.user;
    },
  },
});
