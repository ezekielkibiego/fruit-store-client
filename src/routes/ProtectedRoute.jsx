import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loader from "../components/Loader";


const ProtectedRoute = ({ children }) => {
    const { token, ready } = useAuth();
    if (!ready) return <Loader />; 

    return token ? children : <Navigate to="/login"  replace/>;
}

export default ProtectedRoute