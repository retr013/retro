import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {login, logout} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import style from './Login.module.css';
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const schema = z.object({
    email: z.string().email({message: 'Please provide a valid email address'}),
    password: z.string().min(6, {message: 'Password should have at least 6 characters'}),
    rememberMe: z.boolean()
});

export default function Login() {

    const dispatch = useDispatch();

    const {isAuth, error, loading} = useSelector(state => state.auth)

    const [menu, setMenu] = useState('welcome')

    const {register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting}
    } = useForm(
        {resolver: zodResolver(schema)}
    )

    useEffect(() => {

    }, [errors, isAuth, error])

    if (loading) {
        return <CircularProgress sx={{background: 'none', color: 'white', position: 'absolute', width: '300px'}}/>
    }

    if (isAuth) {
        return <Navigate to='/profile'/>
    }

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <h1>Welcome!</h1>
            <div>
                {menu === 'welcome' &&
                    <div className={style.loginButtons}>
                        <button className={style.menuSelector} onClick={() => setMenu('login')}>login</button>
                        <button className={style.menuSelector} onClick={() => setMenu('register')}>register</button>
                    </div>
                }
                {menu === 'login' &&
                    <div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder='email'
                                {...register('email')}
                                className={!errors.login ? '' : style.loginInputError}
                            />
                            <input type="password" placeholder='password'
                                   {...register('password')}/>
                            <div>
                                <input className={style.checkBox} type="checkbox" {...register('rememberMe')}/>
                                <p>remember me</p>
                            </div>
                            <input type="submit" value="Submit"/>
                        </form>
                        {errors.login && <p>{errors.login.message}</p>}
                        {errors.password && <p>{errors.password.message}</p>}
                        {isSubmitting && <p>loading...</p>}
                        {error ? <p>{error}</p> : null}
                    </div>
                }
            </div>
        </>
    )
}