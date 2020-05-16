<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <h1>『{{ title }}』に答える</h1>
        <h2>{{ currentUserEmail }}さん</h2>

        <v-tabs vertical v-if="selected">
          <v-tab
            v-for="(selectedVal, userIndex) in selected"
            v-bind:key="userIndex"
          >
            <v-icon left>mdi-account</v-icon
            >{{ users.list.find(u => u.index == userIndex).email }}
          </v-tab>
          <v-tab-item
            v-for="(selectedVal, userIndex) in selected"
            v-bind:key="userIndex"
          >
            <v-card flat>
              <v-card-title
                >{{ users.list.find(u => u.index == userIndex).email }}
                {{
                  currentUserEmail ==
                  users.list.find(u => u.index == userIndex).email
                    ? "(自分)"
                    : "さん"
                }}をどう思いますか？</v-card-title
              >
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="choice in choices.list"
                    v-bind:key="choice.index"
                    xs="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <v-card>
                      <v-checkbox
                        v-model="selected[userIndex]"
                        :label="choice.name"
                        :value="choice.index"
                      ></v-checkbox>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <v-btn
          outlined
          color="success"
          :to="'/johari-window/' + $route.params.id + '/'"
        >
          <v-icon left>mdi-plus-box</v-icon>後で回答する
        </v-btn>
        <v-btn color="primary" @click="submit()">
          回答を送信する
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head: {
    title: "回答 | ジョハリの窓"
  },
  data: () => {
    return {
      currentUserEmail: "",
      title: "",
      users: {
        list: [],
        nextIndex: 0
      },
      choices: {
        list: [],
        nextIndex: 0
      },
      selected: null
    };
  },
  computed: {},
  async created() {
    this.currentUserEmail = this.$store.state.user.email;

    const doc = await this.$store.dispatch("johariWindow/get", {
      context: this,
      id: this.$route.params.id
    });
    // console.log("doc", doc);
    this.title = doc.title;
    this.users = doc.users;
    this.choices = doc.choices;

    if (!doc.selected || !doc.selected[this.currentUserEmail]) {
      this.selected = {};
      let newSelected = {};
      doc.users.list.forEach(user => {
        newSelected[user.index] = [];
      });
      this.selected = newSelected;
      console.log("this.selected", this.selected);
    } else {
      console.error("すでに回答済みです");
    }
  },
  methods: {
    async submit() {
      // データの登録
      let updateDoc = {
        id: this.$route.params.id
      };
      let currentUserIndex = this.users.list.find(
        u => u.email == this.currentUserEmail
      ).index;
      updateDoc[`selected.${currentUserIndex}`] = this.selected;
      const res = await this.$store.dispatch("johariWindow/update", {
        context: this,
        doc: updateDoc
      });

      // 詳細画面へ遷移
      // console.log("データ登録完了", res);
      this.$router.push(`/johari-window/${this.$route.params.id}/`);
    }
  }
};
</script>
