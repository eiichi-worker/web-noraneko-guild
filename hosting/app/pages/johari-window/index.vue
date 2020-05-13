<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
          <v-btn outlined color="success" to="/johari-window/new">
            <v-icon left>mdi-plus-box</v-icon> 新しくジョハリの窓を始める
          </v-btn>

      <v-card v-for="item of list" :key="item.id">
        <p>{{ item.id }}</p>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ list: "johariWindow/list" })
  },
  created() {
// console.log(this);
this.$store.dispatch("johariWindow/bindList",this);
console.log(this.list);

  }
};
</script>
