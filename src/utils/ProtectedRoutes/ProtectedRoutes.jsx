import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoutes = () => {

    const isAuthorised = useSelector((state) => state.auth.isAuth);
    const initialized = useSelector((state) => state.auth.initialized);

    if (!initialized) {
        return <div>Loading</div>;
    }

    // debugger

    if (isAuthorised === false) {
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
};