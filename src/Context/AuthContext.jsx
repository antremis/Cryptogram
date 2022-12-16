import { createContext, useContext, useState } from 'react';
import { notify } from '../Components/Alert';
import { getUser, googleAuth, facebookAuth, normalAuth, signout } from '../Firebase/Auth';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = async (type, email, password) => {
		if (type === 'GOOGLE') {
			const user = await googleAuth();
		} else if (type === 'FACEBOOK') {
			const user = await facebookAuth();
		} else if (type === 'NORMAL') {
			const user = await normalAuth('LOGIN', email, password);
		} else {
			notify({alert:`Unknown login method`, type:'error'});
		}
	};

	const signup = async (email, password) => {
		const user = await normalAuth('SIGNUP', email, password);
	};

    const signOut = () => {
        signout()
    }

	useState(() => {
        const unsubListener = getUser((user) => {
            setLoading(true)
            setUser(user)
            setLoading(false)
        })

        return () => {
            unsubListener()
        }
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, signup, signOut }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
export const useAuthContext = () => {
	if (AuthContext) return useContext(AuthContext);
	else {
		console.log('Auth Context Not Available');
		return null;
	}
};
