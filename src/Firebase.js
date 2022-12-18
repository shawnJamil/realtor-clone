// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ-ZiRWo2NxL2iE0CsxJE0hv6U5LVDO5M",
  authDomain: "realtor-clone-9ad11.firebaseapp.com",
  projectId: "realtor-clone-9ad11",
  storageBucket: "realtor-clone-9ad11.appspot.com",
  messagingSenderId: "380465470683",
  appId: "1:380465470683:web:d159b163ac8272d82a00fe",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
