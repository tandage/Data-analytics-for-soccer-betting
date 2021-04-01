import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {auth, db} from "../../../app/myfirebase";
import firebase from "firebase";
import {useDispatch} from "react-redux";
import {toggleLoginModelShow} from "../../notice/noticeSlice";

const RaiseNotice = (flag, message) => {
    const dispatch = useDispatch()
    dispatch(toggleLoginModelShow({q: "loginModelShow", flag: flag, message: message,}))
}

export const authority = createAsyncThunk('user/authority', async ({email, password}) => {

    let response
    let error
    try {
        response = await auth.signInWithEmailAndPassword(email, password)
    } catch (outerException) {
        error = {flag: true, message: outerException.message}
        try {
            response = await auth.createUserWithEmailAndPassword(email, password);
            response = await auth.signInWithEmailAndPassword(email, password);
        } catch (innerException) {
            return {error: error}
        }
    }
    response = {
        isNewUser: response.additionalUserInfo.isNewUser,
        isDelete: false, email: email, password: password, toUpdate: true
    }
    await update(response)
    if (!error)
        error = {flag: false, message: ""}

    return {response, error}
})

export const authorityWithGoogle = createAsyncThunk('user/authorityWithGoogle', async () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    let response
    let error
    try {
        response = await auth.signInWithPopup(provider)
    } catch (e) {
        error = {flag: true, message: e.message}
        return {response, error}
    }

    response = {
        isNewUser: response.additionalUserInfo.isNewUser,
        ...response.additionalUserInfo.profile,
        isDelete: false, toUpdate: false
    }
    await update(response)

    error = {flag: false, message: ""}

    return {response, error}
})

export const passwordReset = createAsyncThunk('user/passwordReset', async ({email}) => {
    let response
    let error
    try {
        response = await auth.sendPasswordResetEmail(email)
    } catch (e) {
        error = {flag: true, message: e.message}
    }
    if (!error)
        error = {flag: true, message: "you have been sent an email !"}
    return {response, error}
})

const update = async (user) => {
    let response
    try {
        const node = await db.collection("users").doc(user.email)
        const document = await node.get()
        if (!document.exists || document.data().toUpdate) {
            response = node.set(user)
        }
    } catch (e) {
        console.log(e)
    }
    return response
}

const UserSlice = createSlice({
    name: "user",
    initialState: {
        isLogin: false,
        userInfo: {},
        error: {flag: false, message: ""}
    },
    reducers: {
        recoverErrorMessage: (state) => {
            state.error = {flag: false, message: ""}
        }
    },
    extraReducers: {
        [authority.fulfilled]: (state, action) => {
            if (action.payload.response)
                state.isLogin = true
            state.userInfo = action.payload.response
            state.error = action.payload.error
        },
        [passwordReset.fulfilled]: (state, action) => {
            state.error = action.payload.error
        },
        [authorityWithGoogle.fulfilled]: (state, action) => {
            if (action.payload.response)
                state.isLogin = true
            state.userInfo = action.payload.response
            state.error = action.payload.error
        },
    }

})
export const {recoverErrorMessage} = UserSlice.actions
export default UserSlice.reducer