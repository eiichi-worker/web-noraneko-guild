<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <h2>答える</h2>

        <v-tabs vertical>
          <v-tab v-for="item in users.list" v-bind:key="item.index">
            <v-icon left>mdi-account</v-icon>{{ item.userId }}
          </v-tab>
          <v-tab-item v-for="item in users.list" v-bind:key="item.index">
            <v-card flat>
              <v-card-title>{{ item.userId }}</v-card-title>
              <v-card-text>
                {{ selected[item.userId] }}
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
                        v-model="selected[item.userId]"
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
      users: {
        list: [
          { index: 0, userId: "A" },
          { index: 1, userId: "B" },
          { index: 2, userId: "C" }
        ],
        nextIndex: 3
      },
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
  created() {},
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
