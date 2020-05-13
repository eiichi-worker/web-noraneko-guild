<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <h2>ユーザーの追加</h2>
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
                    v-model="item.userId"
                    label="userId"
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
      users: {
        list: [{ index: 0, userId: "" }],
        nextIndex: 1
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
        userId: ""
      });
      console.log(this.users);
    },
    deleteUserField(index) {
      this.users.list.splice(index, 1);
      if (this.users.list.length === 0) {
        this.users.nextIndex = 1;
      }
    },
    async start() {
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
      const res = await this.$store.dispatch("johariWindow/add", {
        context: this,
        doc: {
          users: userIdList
        }
      });

      // 詳細画面へ遷移
      console.log("データ登録完了", res);
      this.$router.push(`/johari-window/${res.id}/answer/`);
    }
  }
};
</script>
