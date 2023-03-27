import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Login'
import Wrapper from '../Shared/Wrapper'
import Chat from '../Pages/Chat'
import {useAuthContext} from '../Context/AuthContext'
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import Explore from "../Pages/Explore";

export const RootRouter = () => {
    const {user} = useAuthContext()
    
	return (
        <BrowserRouter>
            {
                user
                ? (<Routes>
                    <Route exact path="/" element={<Wrapper Child={Dashboard}/>} />
                    <Route exact path="/app" element={<Wrapper Child={Dashboard}/>} />
                    <Route exact path="/chat" element={<Wrapper Child={Chat}/>} />
                    <Route exact path="/explore" element={<Wrapper Child={Explore}/>} />
                    <Route exact path="/explore/:hashtag" element={<Wrapper Child={Dashboard} />} />
                    <Route exact path="/profile/:handle" element={<Wrapper Child={Profile}/>} />
                </Routes>)
                : (<Routes>
                    <Route exact path="*" element={<Login />} />
                </Routes>)
            }
        </BrowserRouter>
	);
};

export default RootRouter;