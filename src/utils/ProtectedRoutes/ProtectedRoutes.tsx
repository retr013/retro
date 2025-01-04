import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector } from "../../redux/redux-store";

export const ProtectedRoutes = () => {

    const location = useLocation();

    const { isAuth, loading, initialized } = useAppSelector((state) => ({
        isAuth: state.auth.isAuth,
        loading: state.auth.loading,
        initialized: state.auth.initialized,
    }));

    if (loading) {
        return <div>Loading</div>;
    }

    if (!isAuth && initialized) {
        return <Navigate to={"/login"} replace state={{ from: location }}/>;
    }

    return <Outlet />;
};