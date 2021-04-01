import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getApiFetchFixturesByDate} from "../../app/apifetchfixturesbydate";
import moment from "moment";
import {fetchHttpAPI} from "../../app/fetchHttpAPI";
import {keysInHeadersOfFootballAPI} from "../../app/secure";

export const fetchRecentFixturesByDate = createAsyncThunk("fixtures/fetchRecentFixturesByDate",
    async ({delayDays=1}) => {
        const t = moment()
        if (delayDays)
            t.add(delayDays,"days")
        const dataStr = t.format("YYYY-MM-DD")
        const prefix = "https://api-football-v1.p.rapidapi.com/v2/fixtures/date/"
        const url = `${prefix}${dataStr}`
        console.log(url)
        const response =  await fetchHttpAPI(url,{
            method:'GET',
            headers:keysInHeadersOfFootballAPI
        })
        return response
    })



const RecentGameBetsSlice = createSlice({
    name: "recentFixtures",
    initialState : {
        fixtures:[],
    },
    reducers: {

    },
    extraReducers:{
        [fetchRecentFixturesByDate.fulfilled]:(state,action)=>{
           state.fixtures = action.payload.api.fixtures
        },
    }
})

export default RecentGameBetsSlice.reducer