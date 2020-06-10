<template>
  <div class="reg-form">
    <v-form v-if="!regStatus" ref="form" lazy-validation>
      <h1>Register</h1>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Full Name"
        required
      ></v-text-field>
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
      <v-text-field
        v-model="password_confirmation"
        type="password"
        :rules="password_confirmationRules"
        label="Confirm Password"
        required
      ></v-text-field>
      <p class="login-text">
        Have an account?<a style="padding: 10px" href="/login">Login</a>
      </p>
      <v-btn color="success" class="mr-4" @click="register">
        Register
      </v-btn>
    </v-form>
    <v-form v-if="regStatus=='verification'" ref="form" lazy-validation>
      <h1>Email Verification</h1>
      <v-text-field
        v-model="verification"
        type="number"
        label="Verification Code"
        required
      ></v-text-field>
      <v-btn color="success" class="mr-4" @click="verify">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      nameRules: [
        (v) => !!v || "Full Name is required",
        (v) => /^[a-zA-Z ]+$/.test(v) || "Full Name must be valid",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      password_confirmation: "",
      password_confirmationRules: [
        (v) => v == this.password || "Passwords not equal",
      ],
      verification: "",
    };
  },
  computed: {
    regStatus: function() {
      return this.$store.getters.authStatus;
    },
  },
  methods: {
    register: function() {
      if (this.$refs.form.validate()) {
        let data = {
          full_name: this.name,
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("register", data).catch((err) => console.log(err));
      }
    },
    verify: function() {
      let data = {
        full_name: this.name,
        email: this.email,
        password: this.password,
        verification_code: this.verification
      };
      this.$store
          .dispatch("email_verification", data)
          .then(() => this.$router.push("/secure"))
          .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
.reg-form {
  text-align: center;
  margin: auto;
}
.login-text {
  margin: 20px;
}
</style>
