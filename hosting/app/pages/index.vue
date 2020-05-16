<template>
  <div class="text-center">
    <h1>
      ようこそ!
      <span v-if="currentUser">{{ currentUser.displayName }}さん!</span>
    </h1>

    <h2>仲間と成長するツールボックス「ノラネコギルド」</h2>
    <p>
      ノラネコギルドは、仲間を知り、HRT（謙虚・尊敬・信頼）を築き、継続的に成長し、成果を出せるチームを作るためのツールです。<br />
      世の中のプラクティスを使いやすく整理し、結果をいつでも見れるようにします。<br />
    </p>
    <p v-if="!currentUser">
      まずは<a href="/signin">サインイン</a>しましょう！
    </p>
    <a href="/johari-window/" target="">ジョハリの窓</a>
  </div>
</template>

<script>
export default {
  head: {
    title: "トップ"
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  }
};
</script>

<style></style>
