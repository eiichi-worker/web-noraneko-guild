<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <h2>結果</h2>

        <v-tabs vertical>
          <v-tab v-for="userId in users" v-bind:key="userId">
            <v-icon left>mdi-account</v-icon>{{ userId }}
          </v-tab>

          <v-tab-item v-for="userId in users" v-bind:key="userId">
            <v-card flat>
              <v-card-title>{{ userId }}</v-card-title>
              <v-card-text>
                {{ selected[userId] }}
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
                        v-model="selected[userId]"
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

        <v-btn color="primary" @click="submit()">
          回答終了
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {
      users: ["A", "B", "C"],
      choices: {
        list: [
          { index: 0, name: "あたまがいい" },
          { index: 1, name: "やさしい" },
          { index: 2, name: "威圧感がある" },
          { index: 3, name: "頑固" },
          { index: 4, name: "聞き上手" },
          { index: 5, name: "話し上手" },
          { index: 6, name: "人見知り" },
          { index: 7, name: "謙虚" },
          { index: 8, name: "傲慢" },
          { index: 9, name: "正義感がある" },
          { index: 10, name: "思いやりがある" }
        ],
        nextIndex: 11
      },
      selected: {
        A: [],
        B: [],
        C: []
      }
    };
  },
  computed: {},
  async created() {
    const doc = await this.$store.dispatch("johariWindow/get", {
      context: this,
      id: this.$route.params.id
    });
    console.log("doc", doc);
    this.users = doc.users;
    this.choices = doc.choices;
    this.selected = doc.selected;
  },
  methods: {
    async submit() {
      var userIdList = this.users.list
        .map(o => {
          console.log(o);

          return [o.userId];
        })
        .reduce((a, b) => {
          console.log(a, b);

          return a.concat(b);
        });
      console.log(userIdList);

      // データの登録
      const res = await this.$store.dispatch("johariWindow/set", {
        context: this,
        doc: {
          id: this.$route.params.id,
          users: userIdList,
          choices: this.choices,
          selected: this.selected
        }
      });

      // 詳細画面へ遷移
      console.log("データ登録完了", res);
      this.$router.push(`/johari-window/${this.$route.params.id}/`);
    }
  }
};
</script>
