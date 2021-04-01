import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchHttpAPI} from "../../app/fetchHttpAPI";
import {keysInHeadersOfNews} from "../../app/secure";

const f = async ({q = "today", offset = 0, count = 9999}) => {

    const prefix = "https://bing-news-search1.p.rapidapi.com/news/search"
    const url = `${prefix}?q=${"football" + " " + q}&count=${count}&offset=${offset}
    &setLang=en&freshness=Day&textFormat=Raw&safeSearch=Off&originalImg=true`
    const response = await fetchHttpAPI(url, {"headers": keysInHeadersOfNews})

    return {...response, q: q}
}

export const fetchNews = createAsyncThunk("news/fetchNews", f)

export const fetchSpecificNews = createAsyncThunk("news/fetchSpecificNews", f)

const fill = (state, action, label) => {
    let {q, value} = action.payload
    if (value && value.length !== 0) {
        let t
        if (label === "fetchNews")
            t = state.data.list
        else if (label === "fetchSpecificNews")
            t = state.data.t_news

        value = value.filter(cur => {
            if (cur.image != null && !t.some(item => item.name === cur.name)) {
                cur.q = q
                return true
            }
            return false
        })

        if (value.length !== 0) {
            if (label === "fetchNews"){
                value[0].id = state.data.count
                state.data.count = state.data.count+1
                t.push(value[0])
            }
            else if (label === "fetchSpecificNews"){
                state.data.t_count = 0
                state.data.t_news = value.reduce((acc,cur,index)=>{
                    if (index >= 9)
                        return acc
                    cur.id = state.data.t_count
                    state.data.t_count = state.data.t_count+1
                    acc.push(cur)
                    return acc
                },[])

            }



        }

    }
}

const NewsSlice = createSlice({
    name: "news",
    initialState: {
        data: {list: [], t_news: [], count: 0, t_count: 0},
    },
    reducers: {},
    extraReducers: {
        [fetchNews.fulfilled]: (state, action) => {
            fill(state, action, "fetchNews")
        },
        [fetchSpecificNews.fulfilled]: (state, action) => {
                console.log(action)
            fill(state, action, "fetchSpecificNews")
        }
    },



})

export default NewsSlice.reducer
