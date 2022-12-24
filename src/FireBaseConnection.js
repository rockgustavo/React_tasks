import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAztH3BYJO9vF956RyWqQqN7FFIvEcjO28",
    authDomain: "cursoapp-dd9c6.firebaseapp.com",
    projectId: "cursoapp-dd9c6",
    storageBucket: "cursoapp-dd9c6.appspot.com",
    messagingSenderId: "1024227346254",
    appId: "1:1024227346254:web:25507bed1877e7fe07001f"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };