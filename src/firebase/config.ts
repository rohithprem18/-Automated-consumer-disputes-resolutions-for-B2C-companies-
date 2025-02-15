import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your new Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9QRWsr4ek5a3hX982gZgSLsFll_xbGgA",
  authDomain: "chatbot-support-e3aec.firebaseapp.com",
  projectId: "chatbot-support-e3aec",
  storageBucket: "chatbot-support-e3aec.firebasestorage.app",
  messagingSenderId: "589667002040",
  appId: "1:589667002040:web:0ec5e55c220ddf145c364d",
  measurementId: "G-NK0QHKX5X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 