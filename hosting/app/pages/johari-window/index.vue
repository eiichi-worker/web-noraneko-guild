<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn outlined color="success" to="/johari-window/new">
        <v-icon left>mdi-plus-box</v-icon> 新しくジョハリの窓を始める
      </v-btn>

      <v-card>
        <v-list two-line subheader>
          <v-list-item
            v-for="item in list"
            :key="item.id"
            :to="'/johari-window/' + item.id"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="dateFormat(item.timestamp)"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";

export default {
  computed: {
    ...mapGetters({ list: "johariWindow/list" })
  },
  created() {
    // console.log(this);
    this.$store.dispatch("johariWindow/bindList", this);
    console.log(this.list);
  },
  methods: {
    dateFormat: function(timestamp) {
      console.log(timestamp);
      return DateTime.fromSeconds(timestamp.seconds).toFormat(
        "y/LL/dd HH:mm:ss"
      );
    }
  }
};
</script>
