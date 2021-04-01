import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authority, authorityWithGoogle, passwordReset, recoverErrorMessage} from "./usersSlice";
import Notice from "../../notice/notice";


const LoginModal = () => {
    const [context, setContext] = useState("login")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userInfo)
    const loginClick = () => {
        dispatch(authority({email: username, password: password}))
    }
    const passwordResetClick = () => {
        dispatch(passwordReset({email: username}))
    }
    const loginWithGoogleClick = () => {
        dispatch(authorityWithGoogle())
    }
    useEffect(() => dispatch(recoverErrorMessage()), [username, password])
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                login
            </button>
            <div className="modal fade " id="exampleModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered ">
                    <div className="modal-content ">
                        <div className="modal-body ">
                            <div className="container">
                                {context === "login" && <LoginPart
                                    contextOnchange={() => setContext("forgetPassword")}
                                    usernameOnchange={setUsername}
                                    passwordOnchange={setPassword}
                                    username={username}
                                    password={password}
                                    loginClick={loginClick}
                                    loginWithGoogleClick={loginWithGoogleClick}
                                />}
                                {context === "forgetPassword" && <ForgetPasswordPart
                                    username={username}
                                    usernameOnchange={setUsername}
                                    contextOnchange={() => setContext("login")}
                                    passwordResetClick={passwordResetClick}/>}
                                <Notice/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const LoginPart = (props) => {

    const {contextOnchange, usernameOnchange, passwordOnchange, username, password, loginClick, loginWithGoogleClick} = props
    return (<>

            <form>
                <div className="row mb-2 ">
                    <label className="form-label col-4" htmlFor="email">Email address</label>
                    <input id="email" className="form-control col-auto" type="email" placeholder="Enter Email"
                           value={username} required
                           onChange={(e) => usernameOnchange(e.target.value)}/>
                    <div className="form-text"> unregistered account will automatically sign up !</div>
                </div>
                <div className="row mb-2">
                    <label className="form-label col-4" htmlFor="password">Password</label>
                    <input id="password" className="form-control col-auto" type="password" placeholder="Enter Password"
                           value={password} required
                           onChange={(e) => passwordOnchange(e.target.value)}/>
                    <div className="form-text"><a className=" text-danger"
                                                  onClick={contextOnchange}>forget
                        password?</a></div>
                </div>
            </form>
            <div className="row row-cols-2 mb-2">
                <button className="btn btn-outline-secondary col-5 " type="button" onClick={loginWithGoogleClick}>
                    sign in with Google
                </button>
                <button className="btn btn-primary col-5 ms-auto" type="button" onClick={loginClick} >
                    submit
                </button>
            </div>

        </>
    )
}

const ForgetPasswordPart = (props) => {
    const {contextOnchange, usernameOnchange, username, passwordResetClick} = props
    return (
        <form className="form-floating">
            <div className="row mb-2">
                <label className="form-label col-4" htmlFor="email">Email address</label>
                <input id="email" className="form-control col-auto" type="email"
                       placeholder="Enter email that you want to reset the password"
                       value={username} required
                       onChange={(e) => usernameOnchange(e.target.value)}/>
                <div className="form-text"> We will send you an email !</div>
            </div>

            <div className="row row-cols-2 mb-2">
                <button className="btn btn-outline-secondary col-5" type="button" onClick={contextOnchange}>
                    back to login
                </button>
                <button className="btn btn-outline-primary col-5 ms-auto" type="button" onClick={passwordResetClick}>
                    Confirm
                </button>
            </div>
        </form>
    )

}

export default LoginModal