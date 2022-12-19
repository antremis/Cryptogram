import { createContext, useContext, useEffect, useState } from 'react';
import {useAuthContext} from './AuthContext'
import { notify } from '../Components/Alert';
import axios from 'axios'

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	const {user} = useAuthContext();
    const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        if(!user){
            setProfile(null)
            setLoading(false)
            return
        }
        const baseurl = import.meta.env.VITE_BACKEND_URL
        axios
            .get(`${baseurl}/api/user/${user.uid}`)
            .then(data => {
                setProfile(data.data.data)
            })
            .catch(error => notify({
                alert: error.message,
                type: 'error'
            }))
            .finally(setLoading(false))
    }, [user])

	return (
		<UserContext.Provider value={{ profile }}>
			{loading ? null : children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
export const useUserContext = () => {
	if (UserContext) return useContext(UserContext);
	else {
		console.log('Auth Context Not Available');
		return null;
	}
};
