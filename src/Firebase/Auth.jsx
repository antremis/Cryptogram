import {
    onAuthStateChanged,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { AUTH } from './Firebase';

AUTH.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const normalAuth = async (ACTION, email, password) => {
	if (ACTION === 'LOGIN') {
		try {
			const Cred = await signInWithEmailAndPassword(
				AUTH,
				email,
				password
			);
			return Cred.user;
		} catch (error) {
			console.log(error.message);
			return null;
		}
	} else if (ACTION === 'SIGNUP') {
		try {
			const Cred = await createUserWithEmailAndPassword(
				AUTH,
				email,
				password
			);
			return Cred.user;
		} catch (error) {
			console.log(error.message);
			return null;
		}
	} else {
		console.log('Invalid action provided');
		return null;
	}
};

const googleAuth = async () => {
	try {
		const result = await signInWithPopup(AUTH, googleProvider);
		return result.user;
	} catch (error) {
		if (error.code === 'auth/account-exists-with-different-credential') {
			console.log(
				`${error.email} is already linked to a different account`
			);
		} else {
			console.log(error.message);
		}
		return null;
	}
};

const facebookAuth = async () => {
	try {
		const result = await signInWithPopup(AUTH, facebookProvider);
		return result.user;
	} catch (error) {
		if (error.code === 'auth/account-exists-with-different-credential') {
			console.log(
				`${error.email} is already linked to a different account`
			);
		} else {
			console.log(error.message);
		}
		return null;
	}
};

const signout = async () => {
	try {
		await signOut(AUTH);
	} catch (err) {
		console.log('some error occured');
	}
};

const getUser = (callback) => {
    return onAuthStateChanged(AUTH, callback);
}

export { getUser, googleAuth, facebookAuth, normalAuth, signout };
