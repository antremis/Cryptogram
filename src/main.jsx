import ReactDOM from "react-dom/client";
import RootRouter from "./Routers/RootRouter";
import AuthContextProvider from "./Context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.querySelector('#root')).render(
	<AuthContextProvider>
		<RootRouter />
	</AuthContextProvider>
);
