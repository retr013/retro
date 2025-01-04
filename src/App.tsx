import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import Login from "./components/Login/Login";
import { ProtectedRoutes } from "./utils/ProtectedRoutes/ProtectedRoutes";
import Error404 from "./utils/Error404/Error404";
import InDevelopment from "./utils/FeatureInDevelopment/Development";

// Redux
import { useAppDispatch, useAppSelector } from "./redux/redux-store";
import { fetchLoginInfo } from "./redux/authReducer";
import { fetchProfile } from "./redux/userProfileReducer";

// Lazy-loaded components
const News = lazy(() => import("./components/News/News"));

function App() {

    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const isAuth  = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(fetchLoginInfo()).then((res: { payload: any }) => {
            if (res.payload?.data?.id) dispatch(fetchProfile(res.payload.data.id));
        });
    }, [dispatch, isAuth]);

    return (
            <>
                <Header/>
                <div className='app-wrapper'>
                    <Navbar/>
                    <div className='content'>
                        <Suspense fallback={<div><h1>Loading...</h1></div>}>
                            <Routes>
                                <Route path={'/'} element={<ProtectedRoutes/>}>
                                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                    <Route path='/profile/:userId?' element={<Profile/>}/>
                                    <Route path='/news' element={<News a='News props'/>}/>
                                    <Route path='/users' element={<Users/>}/>
                                    <Route path='/music' element={<InDevelopment/>}/>
                                    <Route path='/settings' element={<InDevelopment/>}/>
                                    <Route path='/' element={<Profile/>}/>
                                </Route>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='*' element={<Error404/>}/>
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </>
    )
}

export default App;
