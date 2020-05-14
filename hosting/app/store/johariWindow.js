import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
// const db = this.$fireStoreObj;

export const state = () => ({
  list: []
});

export const mutations = vuexfireMutations;

export const actions = {
  bindList: firestoreAction(({ bindFirestoreRef }, context) => {
    // return the promise returned by `bindFirestoreRef`
    console.log(context);
    return bindFirestoreRef(
      "list",
      context.$fireStore
        .collection("johariWindowList")
        .where(
          "users.authorizationList",
          "array-contains",
          context.$store.state.user.email
        )
    );
  }),

  add: firestoreAction(async function({}, { context, doc }) {
    console.log("johariWindowList:add", doc);
    return await context.$fireStore.collection("johariWindowList").add(doc);
  }),

  // set: firestoreAction(async function({}, { context, doc }) {
  //   console.log("johariWindowList:set", doc);
  //   const id = doc.id;
  //   delete doc.id;
  //   return await context.$fireStore
  //     .collection("johariWindowList")
  //     .doc(id)
  //     .set(doc);
  // }),
  update: firestoreAction(async function({}, { context, doc }) {
    console.log("johariWindowList:set", doc);
    const id = doc.id;
    delete doc.id;
    return await context.$fireStore
      .collection("johariWindowList")
      .doc(id)
      .update(doc);
  }),

  get: firestoreAction(async function({}, { context, id }) {
    console.log("johariWindowList:get", id);
    // return await context.$fireStore.collection("johariWindowList").doc(id).get();
    let res = null;
    await context.$fireStore
      .collection("johariWindowList")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          res = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.error("Error getting document:", error);
      });

    return res;
  })
};

export const getters = {
  list: state => state.list
};
