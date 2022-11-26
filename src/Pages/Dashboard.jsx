import { useAuthContext } from "../Context/AuthContext"

const Dashboard = () => {
    const {signOut} = useAuthContext()

    return(
        <h1 onClick={signOut}>Dashboard</h1>
    )
}

export default Dashboard