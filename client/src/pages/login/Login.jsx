import { React, useContext, useRef } from 'react';
import "./login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {

    const username = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);


    const handleClick = (e)=>{
        e.preventDefault()
        loginCall({username:username.current.value, password:password.current.value}, dispatch)
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">CS 490 Project</h3>
                    <span className="loginDesc">Connect with like-minded sports fans around the world on our social network.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username" 
                            className="loginInput" 
                            ref={username}
                            required 
                        />
                        <input 
                            placeholder="Password" 
                            type="password" 
                            className="loginInput" 
                            ref={password} 
                            required
                            minLength="5"
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                            <CircularProgress color="secondary" size="20px" />
                             ) : (
                                 "Log In"
                             )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
