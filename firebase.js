import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as admin from 'firebase-admin'

// Secure a connection to FIREBASE from the backend
const serviceAccount = require('./permission.json');
const adminApp = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYtIq-UtNXFYQTtu7GA6CkbI16SrR9S18",
    authDomain: "fsch--clone.firebaseapp.com",
    projectId: "fsch--clone",
    storageBucket: "fsch--clone.appspot.com",
    messagingSenderId: "240473584487",
    appId: "1:240473584487:web:87c667f9cef25675ef75c2"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db, adminApp };