import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {login, logout} from "../../redux/authReducer";
import style from './Login.module.css';
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CircularProgress} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";

// Validation schema using Zod
const schema = z.object({
    email: z.string().email({message: 'Please provide a valid email address'}),
    password: z.string().min(6, {message: 'Password should have at least 6 characters'}),
    rememberMe: z.boolean()
});

// Inferring form types from the schema
export type LoginFormInputs = z.infer<typeof schema>

export default function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Extracting redirect route
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || {pathname: '/profile'}

    const {isAuth, error, loading} = useAppSelector((state) => {
        return {
            isAuth: state.auth.isAuth,
            loading: state.auth.loading,
            error: state.auth.error.loginError
        }
    })

    const [menu, setMenu] = useState<'welcome' | 'login' | 'register'>('welcome')

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<LoginFormInputs>(
        {resolver: zodResolver(schema)}
    )

    useEffect(() => {
        if (isAuth) {
            navigate(from, {replace: true})
        }
    }, [errors, isAuth, error, from])

    const onSubmit = (data: LoginFormInputs) => {
        dispatch(login(data))
    }

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <div className={style.loginContainer}>
                <h1>Welcome!</h1>
                {menu === 'welcome' &&
                    <div className={style.loginButtons}>
                        <button className={style.menuSelector} onClick={() => setMenu('login')}>Login</button>
                        <button className={style.menuSelector} disabled onClick={() => setMenu('register')}>Register
                        </button>
                    </div>
                }
                {menu === 'login' &&
                    <div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder='email'
                                {...register('email')}
                                className={!errors.email ? '' : style.loginInputError}
                            />
                            <input type="password" placeholder='password'
                                   {...register('password')}/>
                            <div className={style.rememberMe}>
                                <input className={style.checkBox} type="checkbox" {...register('rememberMe')}
                                       disabled={isSubmitting}/>
                                <p>remember me</p>
                            </div>
                            <input className={style.menuSelector} type="submit" value="Log in"/>
                            {loading && <div className={style.loader}><CircularProgress
                                sx={{background: 'none', color: 'white', position: 'absolute', width: '300px'}}/></div>}
                        </form>
                        {errors.email && <p>{errors.email.message}</p>}
                        {errors.password && <p>{errors.password.message}</p>}
                        {isSubmitting && <p>loading...</p>}
                        {error ? <p aria-live='polite'>{error}</p> : null}
                    </div>
                }
            </div>
        </>
    )
}