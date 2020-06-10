<template>
  <div class="log-form">
    <v-form ref="form" lazy-validation>
      <h1>Sign in</h1>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <p class="create-acc-text">
        Don't have an account?<a style="padding: 10px" @click="$router.push('/register')"
          >Create Account</a
        >
      </p>
      <v-btn color="success" class="mr-4" @click="login">
        Login
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
    login: function() {
      if (this.$refs.form.validate()) {
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("login", { email, password })
          .then(() => this.$router.push("/secure"))
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style scoped>
.log-form {
  text-align: center;
  margin: auto;
}
.create-acc-text {
  margin: 20px;
}
</style>
