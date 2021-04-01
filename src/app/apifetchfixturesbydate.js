import {createAsyncThunk} from "@reduxjs/toolkit";
import moment from "moment";
import {fetchHttpAPI} from "./fetchHttpAPI";
import {keysInHeadersOfFootballAPI} from "./secure";

export const getApiFetchFixturesByDate = (prefix,delayDays=0)=>{

    return createAsyncThunk(prefix,
        async () => {
            const t = moment()
            if (delayDays)
                t.add(delayDays,"days")
            const dataStr = t.format("YYYY-MM-DD")
            const prefix = "https://api-football-v1.p.rapidapi.com/v2/fixtures/date/"
            const url = `${prefix}${dataStr}`
            const response =  await fetchHttpAPI(url,{
                method:'GET',
                headers:keysInHeadersOfFootballAPI
            })
            return response
        })
}

