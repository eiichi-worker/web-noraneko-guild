<template>
  <div class="text-center">
    <h1>
      Welcome <span v-if="currentUser">{{ currentUser.displayName }}</span>
    </h1>
    <sign-in />
    <div v-if="currentUser">
      <button type="button" class="btn btn-primary" @click="signOut">
        Sign Out
      </button>
    </div>

    仲間を知ることで生まれる尊敬・尊重・信頼とコラボレーション
    <a href="/johari-window/" target="">ジョハリの窓</a>
  </div>
</template>

<script>
import SignIn from "~/components/SignIn.vue";

export default {
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    signOut() {
      console.log("signOut");
      this.$fireAuth.signOut();
    }
  },
  components: {
    SignIn
  }
};
</script>

<style></style>
