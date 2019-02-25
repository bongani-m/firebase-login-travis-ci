const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

exports.createUserDoc = functions.auth.user().onCreate((user) => {
    
    const userRef = firestore.doc(`users/${user.uid}`);

    userRef.set({
        email: user.email,
        roles: [],
    });
});
