<template>
  <div class="text-center">
    <h1>
      サインインしましょう
    </h1>
    <sign-in />
  </div>
</template>

<script>
import SignIn from "~/components/SignIn.vue";

export default {
  head: {
    title: "サインイン"
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  components: {
    SignIn
  }
};
</script>

<style></style>
