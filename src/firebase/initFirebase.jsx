// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCIXG3-jGpid1c4-OE-hLgX2qId7vwVgqg",
    authDomain: "top100-b6c39.firebaseapp.com",
    databaseURL: "https://top100-b6c39-default-rtdb.firebaseio.com",
    projectId: "top100-b6c39",
    storageBucket: "top100-b6c39.appspot.com",
    messagingSenderId: "232871965137",
    appId: "1:232871965137:web:439a5d50c692ed0b03f0f0"
};
    
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
    