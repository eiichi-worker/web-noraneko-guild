<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebaseui/dist/firebaseui.css'
// import firebaseui from 'firebaseui'

export default {
  mounted() {
    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");
    // https://github.com/firebase/firebaseui-web/issues/216
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fireAuth);

    const config = {
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID
        this.$fireAuthObj.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: "/",
      // tosUrl: '/tos',
      // privacyPolicyUrl: '/privacy',
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log("signInSuccessWithAuthResult");
        },
        uiShown: function() {
          console.log("uiShown");
        }
      }
    };

    ui.start("#firebaseui-auth-container", config);
  }
};
</script>
