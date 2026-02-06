
import {initializeApp} from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJ67x9u0g-d9l32TxbhNUdgthRlqS8HCQ",
  authDomain: "rabbitz-403bc.firebaseapp.com",
  projectId: "rabbitz-403bc",
  storageBucket: "rabbitz-403bc.firebasestorage.app",
  messagingSenderId: "834324361406",
  appId: "1:834324361406:web:1bcf150efd91f0535c2eef"
};
const app = initializeApp(firebaseConfig);
const provider=new  GoogleAuthProvider()
const auth=getAuth(app)
export async function loginwithGoogle(){
    try{
        const result=await signInWithPopup(auth,provider)
        const username = result.user.displayName;
        return username
        

    } 
    catch (error) {
    console.error(error);
  }
}

