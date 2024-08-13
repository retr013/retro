import logo from './logo.svg';
import React from "react";
import {lazy} from "react";
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
// import News from "./components/News/News";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import Scroll from "./components/common/scrollToTop/Scroll"
import Login from "./components/Login/Login";
import {ProtectedRoutes} from "./utils/ProtectedRoutes/ProtectedRoutes";
import {Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLoginInfo} from "./redux/authReducer";
import {fetchProfile} from "./redux/userProfileReducer";

const News = lazy(() => import('./components/News/News'));


function App() {

    const dispatch = useDispatch();

    const pathname = useLocation().pathname;

    const {isAuth, loading} = useSelector(state => state.auth)

    useEffect(() => {
        if (!["/register", "/login", "/"].includes(pathname)) {
            dispatch(fetchLoginInfo()).then(res => {
                if (res.payload.data.id) dispatch(fetchProfile(res.payload.data.id));
            });
        }
    }, [dispatch, isAuth]);

    return (
            <>
                <Header/>
                <div className='app-wrapper'>
                    <Navbar/>
                    <div className='content'>
                        <Scroll />
                        <Suspense fallback={<div><h1>Loading...</h1></div>}>
                            <Routes>
                                <Route path={'/'} element={<ProtectedRoutes/>}>
                                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                    <Route path='/profile/:userId?' element={<Profile/>}/>
                                    <Route path='/news' element={<News a='News props'/>}/>
                                    <Route path='/users' element={<Users/>}/>
                                </Route>
                                <Route path='/login' element={<Login/>}/>
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </>
    )
}

export default App;
