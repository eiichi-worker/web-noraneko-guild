<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12 lg12>
      <v-card>
        <h1>『{{ title }}』の結果</h1>

        <v-tabs show-arrows>
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
                }}のジョハリの窓</v-card-title
              >
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="windowName in ['open', 'blind', 'hidden', 'unknown']"
                    v-bind:key="windowName"
                    xs="12"
                    sm="12"
                    md="6"
                    lg="6"
                  >
                    <v-card
                      :color="windowInfo[windowName].background"
                      min-height="200px"
                    >
                      <v-toolbar :color="windowInfo[windowName].bar">
                        <v-spacer></v-spacer>
                        <v-icon>{{ windowInfo[windowName].icon }}</v-icon>
                        <v-toolbar-title>
                          {{ windowInfo[windowName].title }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-information-outline</v-icon>
                          </template>
                          <span> {{ windowInfo[windowName].note }}</span>
                        </v-tooltip>
                      </v-toolbar>
                      <v-card-text>
                        <v-row>
                          <v-col
                            v-for="(choiceCount, choiceIndex) in johariWindow[
                              userIndex
                            ][windowName]"
                            v-bind:key="choiceIndex"
                            xs="12"
                            sm="12"
                            md="6"
                            lg="4"
                          >
                            <v-card
                              :color="
                                windowInfo[windowName].choice +
                                  getGradationNo({ count: choiceCount })
                              "
                            >
                              <v-row>
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-col
                                      class="text-truncate text-center white--text"
                                      v-on="on"
                                    >
                                      {{
                                        choices.list.find(
                                          c => c.index == choiceIndex
                                        ).name
                                      }}
                                    </v-col>
                                  </template>
                                  <span>
                                    {{
                                      choices.list.find(
                                        c => c.index == choiceIndex
                                      ).name
                                    }}</span
                                  >
                                  <span
                                    v-if="
                                      windowName == 'open' ||
                                        windowName == 'blind'
                                    "
                                    >({{ choiceCount }})</span
                                  >
                                </v-tooltip>
                              </v-row>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-btn outlined color="" to="/johari-window/">
                  <v-icon left>mdi-arrow-left</v-icon>一覧に戻る
                </v-btn>
                <v-btn
                  outlined
                  color="success"
                  :to="'/johari-window/' + $route.params.id + '/answer'"
                >
                  <v-icon left>mdi-pencil</v-icon> 回答する
                </v-btn>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {
      johariWindow: [],
      windowInfo: {
        open: {
          title: "開放の窓",
          note: "自分も仲間も知っている事",
          background: "red lighten-5",
          bar: "red accent-1",
          choice: "red darken-",
          icon: "mdi-human-greeting"
        },
        blind: {
          title: "盲点の窓",
          note: "仲間は気づいているが、自分は知らない事",
          background: "yellow lighten-4",
          bar: "yellow accent-1",
          choice: "orange  darken-",
          icon: "mdi-eye"
        },
        hidden: {
          title: "秘密の窓",
          note: "自分は認識しているが、仲間は知らない事",
          background: "green  lighten-5",
          bar: "green accent-1",
          choice: "green darken-",
          icon: "mdi-shield"
        },
        unknown: {
          title: "未知の窓",
          note: "誰も知らないこと",
          background: "blue lighten-5",
          bar: "blue accent-1",
          choice: "blue darken-",
          icon: "mdi-earth"
        }
      },
      currentUserEmail: "",
      title: "",
      users: {},
      choices: {},
      selected: {},
      unansweredUsers: {}
    };
  },
  async created() {
    this.currentUserEmail = this.$store.state.user.email;

    const doc = await this.$store.dispatch("johariWindow/get", {
      context: this,
      id: this.$route.params.id
    });
    console.log("doc", doc);
    this.title = doc.title;
    this.users = doc.users;
    this.choices = doc.choices;
    this.selected = doc.selected;

    // 未回答ユーザー
    const userIds = this.users.list.map(u => {
      u.id;
    });
    for (const userId in this.userIds) {
      if (!Object.keys(this.selected).includes(userId)) {
        this.unansweredUsers.push(userId);
      }
    }

    // 回答結果からジョハリの窓作成
    // ターゲット：
    //   open    自分： 知ってる 他人：知ってる
    //   blind   自分： 知らない 他人：知っている
    //   hidden  自分： 知ってる 他人：知らない
    //   unknown 自分： 知らない 他人：知らない
    let johariWindow = {};

    for (const anserUserIndex in this.selected) {
      // 自分の知っている一覧
      let anserUserKnowChoice = this.selected[anserUserIndex][anserUserIndex];
      // 他人の知っている一覧
      let otherUserKnowChoice = [];
      for (const otherUserIndex in this.selected) {
        // 自分の場合はスキップ
        if (anserUserIndex == otherUserIndex) continue;
        otherUserKnowChoice = otherUserKnowChoice.concat(
          this.selected[otherUserIndex][anserUserIndex]
        );
      }
      console.log("自分の知っている一覧", anserUserKnowChoice);
      console.log("他人の知っている一覧", otherUserKnowChoice);
      let tmpJohariWindow = {
        open: {},
        blind: {},
        hidden: {},
        unknown: {}
      };
      anserUserKnowChoice.concat(otherUserKnowChoice).forEach(item => {
        if (
          anserUserKnowChoice.includes(item) &&
          otherUserKnowChoice.includes(item)
        ) {
          //   open    自分： 知ってる 他人：知ってる
          if (!tmpJohariWindow.open[item]) {
            tmpJohariWindow.open[item] = 0;
          }
          tmpJohariWindow.open[item]++;
        } else if (
          !anserUserKnowChoice.includes(item) &&
          otherUserKnowChoice.includes(item)
        ) {
          //   blind   自分： 知らない 他人：知っている
          if (!tmpJohariWindow.blind[item]) {
            tmpJohariWindow.blind[item] = 0;
          }
          tmpJohariWindow.blind[item]++;
        } else if (
          anserUserKnowChoice.includes(item) &&
          !otherUserKnowChoice.includes(item)
        ) {
          //   hidden  自分： 知ってる 他人：知らない
          if (!tmpJohariWindow.hidden[item]) {
            tmpJohariWindow.hidden[item] = 0;
          }
          tmpJohariWindow.hidden[item]++;
        }
      });
      //   unknown 自分： 知らない 他人：知らない
      this.choices.list.forEach(choice => {
        // const choice = this.choices.list[index];
        if (
          !anserUserKnowChoice
            .concat(otherUserKnowChoice)
            .includes(choice.index)
        ) {
          tmpJohariWindow.unknown[choice.index] = Object.keys(
            this.selected
          ).length;
        }
      });

      console.table(tmpJohariWindow);
      johariWindow[anserUserIndex] = tmpJohariWindow;
    }
    console.table("johariWindow", johariWindow);
    this.johariWindow = johariWindow;
  },
  computed: {},
  methods: {
    /**
     * 4段階のグラデーションのために回答者数と回答数からグラデーションを決定する
     */
    getGradationNo: function({ count }) {
      const userCount = this.users.list.length;
      const countRate = count / userCount;
      const gradationNo = Math.ceil(4 * countRate);
      console.log("getGradationNo", {
        userCount,
        countRate,
        gradationNo
      });

      return gradationNo;
    }
  }
};
</script>
