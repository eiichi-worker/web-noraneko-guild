<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
      <v-card>
        <h1>新しくジョハリの窓を始める</h1>
        <h2>タイトル</h2>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="タイトル"
              outlined
              placeholder="新しいジョハリの窓"
              v-model="title"
            ></v-text-field>
          </v-col>
        </v-row>
        <h2>ユーザーの追加</h2>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="あなた"
              outlined
              placeholder=""
              disabled
              :value="this.$store.state.user.email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="addUserField()">
          追加する
        </v-btn>
        <v-list>
          <v-list-item
            v-for="(item, index) in users.list"
            v-bind:key="item.index"
          >
            <v-list-item-content>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.email"
                    label="メールアドレス"
                    outlined
                    placeholder=""
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn icon large @click="deleteUserField(index)">
                    <v-icon color="grey">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <h2>質問の設定</h2>
        <v-btn color="primary" @click="addChoiceField()">
          追加する
        </v-btn>

        <v-list>
          <v-list-item
            v-for="(item, index) in choices.list"
            v-bind:key="item.index"
          >
            <v-list-item-content>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.name"
                    label="質問"
                    outlined
                    placeholder=""
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn icon large @click="deleteChoiceField(index)">
                    <v-icon color="grey">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-btn color="primary" @click="start()">
          始める
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      title: "新しいジョハリの窓",
      users: {
        list: [{ index: 0, email: "" }],
        nextIndex: 1
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
      }
    };
  },
  computed: {
    // ...mapGetters({ list: "johariWindow/list" })
  },
  created() {
    // console.log(this);
    this.$store.dispatch("johariWindow/bindList", this);
    console.log(this.list);
  },

  methods: {
    addUserField() {
      this.users.list.push({
        index: this.users.nextIndex++,
        email: ""
      });
      console.log(this.users);
    },
    deleteUserField(index) {
      this.users.list.splice(index, 1);
      if (this.users.list.length === 0) {
        this.users.nextIndex = 0;
      }
    },
    addChoiceField() {
      this.choices.list.push({
        index: this.choices.nextIndex++,
        name: ""
      });
      console.log(this.users);
    },
    deleteChoiceField(index) {
      this.choices.list.splice(index, 1);
      if (this.choices.list.length === 0) {
        this.choices.nextIndex = 1;
      }
    },
    async start() {
      // const userFindEmail = this.$fireFuncObj().httpsCallable("userFindEmail");
      // this.users.list.push({ email: this.$store.state.user.email }); // 自分を追加
      // let userList = this.users.list
      //   .map(async o => {
      //     console.log(o);
      //     // emailからuidを取得
      //     // let user = null;
      //     // await userFindEmail({ email: o.email }).then(result => {
      //     //   console.log("userFindEmail result", result);
      //     //   user = JSON.stringify(result);
      //     // });
      //     // console.log("userFindEmail success", user);

      //     return [o.email];
      //   })
      //   .reduce((a, b) => {
      //     console.log("reduce", a, b);

      //     return a.concat(b);
      //   });
      // userList.push(this.$store.state.user.email);

      // 自分を追加
      this.users.list.push({
        index: this.users.nextIndex++,
        email: this.$store.state.user.email
      });

      // 権限用にリストを追加
      this.users.authorizationList = this.users.list.map(o => {
        return o.email;
      });

      console.log("this.users.authorizationList", this.users.authorizationList);

      // データの登録
      const res = await this.$store.dispatch("johariWindow/add", {
        context: this,
        doc: {
          title: this.title,
          users: this.users,
          choices: this.choices,
          timestamp: this.$fireStoreObj.FieldValue.serverTimestamp()
        }
      });

      // 詳細画面へ遷移
      console.log("データ登録完了", res);
      this.$router.push(`/johari-window/${res.id}/answer/`);
    }
  }
};
</script>
