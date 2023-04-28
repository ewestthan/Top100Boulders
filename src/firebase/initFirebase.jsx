import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	databaseURL: "https://top100-b6c39-default-rtdb.firebaseio.com",

	apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
	authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
	projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
	storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
	appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logout = () => {
	signOut(auth);
};

export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
