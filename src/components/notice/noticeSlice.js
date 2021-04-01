import {createSlice} from "@reduxjs/toolkit";

const NoticeSlice = createSlice({
    name: "notice",
    initialState : {
        showDic:{loginModelShow:false,message:""}
    },
    reducers: {
        toggleLoginModelShow:(state, action) => {
            const {q,flag,message} = action.payload
            state.showDic[q] = {flag,message}
        }
    },
    extraReducers:{

    }
})
export const { toggleLoginModelShow } = NoticeSlice.actions

export default NoticeSlice.reducer
