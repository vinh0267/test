// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqAOldoRoFs173F0ZZIvtZbOdZzLNp3yM",
    authDomain: "project-33e09.firebaseapp.com",
    projectId: "project-33e09",
    storageBucket: "project-33e09.appspot.com",
    messagingSenderId: "746874663191",
    appId: "1:746874663191:web:1607e96fc3ce3c6e8cc752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)