import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as admin from 'firebase-admin'

// Secure a connection to FIREBASE from the backend
const serviceAccount = require('./permission.json');
const adminApp = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const firebaseConfig = {
    apiKey: "AIzaSyChUWv97J-VEgIx_6_MislCaskAGrlN89Q",
    authDomain: "ak-verse.firebaseapp.com",
    projectId: "ak-verse",
    storageBucket: "ak-verse.appspot.com",
    messagingSenderId: "321920042812",
    appId: "1:321920042812:web:9f8be0da5bfefb42864039"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db, adminApp };