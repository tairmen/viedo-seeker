<template>
  <div class="secure-text">
    <h1>This page is protected by auth</h1>
    <v-card class="user-card mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">User Info</div>
          <v-list-item-title>{{user.name}}</v-list-item-title>
          <v-list-item-title>{{user.email}}</v-list-item-title>
        </v-list-item-content>
        <v-avatar color="indigo">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {
    user: function() {
      return this.$store.getters.getCurrentUser;
    },
  },
}
</script>
<style scoped>
.secure-text {
  text-align: center;
  margin-top: 100px;
}
.user-card {
  margin: 20px;
}
</style>
