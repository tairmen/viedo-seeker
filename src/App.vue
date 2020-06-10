<template>
  <v-app id="app">
    <div>
      <v-app-bar dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title><a href="/">VideoSeeker</a></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip v-if="!isLoggedIn" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="login">
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </template>
          <span>Login</span>
        </v-tooltip>
        <v-tooltip v-if="isLoggedIn" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="logout">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item @click="$router.push('/')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isLoggedIn" @click="$router.push('/secure')">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    login: function() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.v-toolbar__title a {
  color: inherit;
  text-decoration: none;
}
</style>
