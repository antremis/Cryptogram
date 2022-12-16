import ReactDOM from "react-dom/client";
import RootRouter from "./Routers/RootRouter";
import AuthContextProvider from "./Context/AuthContext";
import PostContextProvider from './Context/PostContext';
import Alerts from './Components/Alert';
import "./index.css";

ReactDOM.createRoot(document.querySelector('#root')).render(
	<AuthContextProvider>
		<PostContextProvider>
			<Alerts />
			<RootRouter />
		</PostContextProvider>
	</AuthContextProvider>
);
