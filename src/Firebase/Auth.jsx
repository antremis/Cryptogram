import {
    onAuthStateChanged,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { notify } from '../Components/Alert';
import { AUTH } from './Firebase';

AUTH.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const normalAuth = async (ACTION, email, password) => {
	try{
		if (ACTION === 'LOGIN') {
			const Cred = await signInWithEmailAndPassword(
				AUTH,
				email,
				password
			);
			return Cred.user;
		} else if (ACTION === 'SIGNUP') {
			const Cred = await createUserWithEmailAndPassword(
				AUTH,
				email,
				password
			);
			return Cred.user;
		} else {
			throw 'Invalid action provided'
		}
	}
	catch (error) {
		if (error.code === 'auth/account-exists-with-different-credential') {
			notify({
				alert:`${error.email} is already linked to a different account`,
				type: 'error'
			});
		} else {
			notify({alert:error.message, type:'error'});
		}
		return null;
	}
};

const googleAuth = async () => {
	try {
		const result = await signInWithPopup(AUTH, googleProvider);
		return result.user;
	} catch (error) {
		if (error.code === 'auth/account-exists-with-different-credential') {
			notify({
				alert:`${error.email} is already linked to a different account`,
				type: 'error'
			});
		} else {
			notify({alert:error.message, type:'error'});
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
			notify({
				alert:`${error.email} is already linked to a different account`,
				type: 'error'
			});
		} else {
			notify({alert:error.message, type:'error'});
		}
		return null;
	}
};

const signout = async () => {
	try {
		await signOut(AUTH);
	} catch (err) {
		notify({alert:'some error occured', type:'error'});
	}
};

const getUser = (callback) => {
    return onAuthStateChanged(AUTH, callback);
}

export { getUser, googleAuth, facebookAuth, normalAuth, signout };
