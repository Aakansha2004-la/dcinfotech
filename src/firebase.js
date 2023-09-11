import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBbwGdG1Kwn5bQ0fg1GcgmAeFNnPjGObNA",
    authDomain: "uploadingfile-59a57.firebaseapp.com",
    projectId: "uploadingfile-59a57",
    storageBucket: "uploadingfile-59a57.appspot.com",
    messagingSenderId: "24726064288",
    appId: "1:24726064288:web:febaa32e0ab7a3fb684dc5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)