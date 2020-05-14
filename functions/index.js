const functions = require("firebase-functions");
// import default from './../hosting/app/nuxt.config';
const admin = require("firebase-admin");
admin.initializeApp();

// const cors = require("cors");

// exports.userFindEmail = functions.https.onCall(async (request, response) => {
//   // return cors(request, response, async () => {
//     const body = request.body;
//     console.log(JSON.stringify(body));

//     try {
//       const idToken = getIdToken(request, response); // Bearerトークン取れるかチェック
//       const decodedToken = await admin.auth().verifyIdToken(idToken);

//       console.log(decodedToken.uid); // Firebase Authentication 上のユーザUID
//     } catch (error) {
//       console.log(error.message);
//       response.status(401).send(error.message);
//     }

//     if (!body.email) {
//       response.status(400).send("not email");
//     }

//     // プロフィールの取得
//     let user = null;
//     await admin
//       .auth()
//       .getUserByEmail(body.email)
//       .then(function (userRecord) {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log("Successfully fetched user data:", userRecord.toJSON());
//         user = userRecord.toJSON();
//       })
//       .catch(function (error) {
//         console.log("Error fetching user data:", error);
//         response.status(404).send(error.message);
//       });

//     response.send(JSON.stringify(user));
//   // });
// });

// function getIdToken(request, response) {
//   if (!request.headers.authorization) {
//     throw new Error("Authorization ヘッダが存在しません。");
//   }
//   const match = request.headers.authorization.match(/^Bearer (.*)$/);
//   if (match) {
//     const idToken = match[1];
//     return idToken;
//   }
//   throw new Error(
//     "Authorization ヘッダから、Bearerトークンを取得できませんでした。"
//   );
// }
