import ReactDOM from "react-dom/client";
import RootRouter from "./Routers/RootRouter";
import AuthContextProvider from "./Context/AuthContext";
import UserContextProvider from './Context/UserContext';
import PostContextProvider from './Context/PostContext';
import Alerts from './Components/Alert';
import "./index.css";
import ChatContextProvider from "./Context/ChatContext";

ReactDOM.createRoot(document.querySelector('#root')).render(
	<>
	<Alerts />
	<AuthContextProvider>
		<UserContextProvider>
			<PostContextProvider>
				<ChatContextProvider>
					<RootRouter />
				</ChatContextProvider>
			</PostContextProvider>
		</UserContextProvider>
	</AuthContextProvider>
	</>
);
