import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const RequireAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const location = useLocation();
    const jwt = localStorage.getItem('token');
    try {
        const decoded = jwtDecode(jwt);
        console.log('jwt ' + JSON.stringify(decoded.roles));
        const roles = decoded.roles;
        return (
            roles.find(role => allowedRoles?.includes(role))
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
        );
    } catch (e) {
        toast.error('You have to login first');
        return <Navigate to="/login" replace />
    }

}

export default RequireAuth;