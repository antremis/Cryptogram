import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import {useAuthContext} from '../Context/AuthContext'

export const RootRouter = () => {
    const {user} = useAuthContext()

	return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Login />} />
            </Routes>
        </BrowserRouter>
	);
};

export default RootRouter;