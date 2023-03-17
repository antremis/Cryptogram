import { createContext, useContext, useEffect, useState } from 'react';
import {useAuthContext} from './AuthContext'
import { notify } from '../Components/Alert';
import axios from 'axios'

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	const {user, token} = useAuthContext();
    const [profile, setProfile] = useState(null)
    
	const [loading, setLoading] = useState(true);

    const getUser = async (handle) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.get(`${baseurl}/api/user/${handle}`, {headers: {authorisation: `Bearer ${token}`}})
            return res.data.data
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const followUser = async (handle) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.put(`${baseurl}/api/user`, {handle}, {headers: {authorisation: `Bearer ${token}`}})
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    useEffect(() => {
        (async function (){
            setLoading(true)
            if(!user){
                setProfile(null)
                setLoading(false)
                return
            }
            const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.get(`${baseurl}/api/user`, {headers: {authorisation: `Bearer ${token}`}})
            setProfile(res.data.data)
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
            setLoading(false)
        })()
    }, [user])

	return (
		<UserContext.Provider value={{ profile, getUser, followUser }}>
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
