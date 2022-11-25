import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import dotenv from 'dotenv'
dotenv()

const firebaseConfig = {
    apiKey: process.env('API_KEY'),
    authDomain: process.env('AUTH_DOMAIN'),
    projectId: process.env('PROJECT_ID'),
    storageBucket: process.env('STORAGE_BUCKET'),
    messagingSenderId: process.env('MESSAGING_SENDER_ID'),
    appId: process.env('APP_ID'),
    measurementId: process.env('MEASUREMENT_ID')
  };

  const app = initializeApp(firebaseConfig);
  const DB = getFirestore(app);
  const AUTH = getAuth(app);
  const analytics = getAnalytics(app);