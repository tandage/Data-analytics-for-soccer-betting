import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getApiFetchFixturesByDate} from "../../app/apifetchfixturesbydate";
import {fetchHttpAPI} from "../../app/fetchHttpAPI";

export const fetchCurrentFixturesByDate = getApiFetchFixturesByDate("fixtures/fetchCurrentFixturesByDate")
export const fetchTeamFixtures = createAsyncThunk("fixtures/fetchTeamFixtures",
    async ({team_id}) => {
        const url = `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${team_id}?timezone=Europe%2FLondon`
        return await fetchHttpAPI(url,)
    })
export const fetchTeamNamesByLeagueId = createAsyncThunk(
    "fixtures/fetchTeamNamesByLeagueId",
    async ({league_id}) => {
        const url = `https://api-football-v1.p.rapidapi.com/v2/teams/league/${league_id}`
        return await fetchHttpAPI(url,)
    })

export const fetchAllLeagues = createAsyncThunk("fixtures/fetchAllLeagues", async () => {
    const url = "https://api-football-v1.p.rapidapi.com/v2/leagues"
    return  await fetchHttpAPI(url,)
})

export const fetchTeamStatistics = createAsyncThunk("fixtures/fetchTeamStatistics", async ({team_id}) => {
    const url = `https://api-football-v1.p.rapidapi.com/v2/statistics/2/${team_id}`
    return  await fetchHttpAPI(url,)
})

export const fetchTeamLeagues = createAsyncThunk("fixtures/fetchTeamLeagues", async ({team_id}) => {
    const url = `https://api-football-v1.p.rapidapi.com/v2/leagues/team/${team_id}`
    return  await fetchHttpAPI(url,)
})

const CurrentGameBetsSlice = createSlice({
    name: "currentFixtures",
    initialState: {
        fixtures: [], t_fixtures: [], t_teams: [], leagues: [], team_statistic:[] ,t_leagues:[]
    },
    reducers: {
        set_t_fixtures: (state, action) => {
            state.t_fixtures = action.payload
        }
    },
    extraReducers: {
        [fetchCurrentFixturesByDate.fulfilled]: (state, action) => {
            state.fixtures = action.payload.api.fixtures
        },
        [fetchTeamNamesByLeagueId.fulfilled]: (state, action) => {
            state.t_teams = action.payload.api.teams
        },
        [fetchAllLeagues.fulfilled]: (state, action) => {
            state.leagues = action.payload.api.leagues.map((item) => ({league_id: item.league_id, name: item.name}))
        },
        [fetchTeamFixtures.fulfilled]: (state, action) => {
            state.t_fixtures = action.payload.api.fixtures
            state.t_fixtures.sort((x, y) => y.event_timestamp - x.event_timestamp)
        },

        [fetchTeamStatistics.fulfilled]:(state,action) =>{
            state.team_statistic = action.payload.api.statistics
        },

        [fetchTeamLeagues.fulfilled]:(state,action) =>{
            if (action.payload.api.leagues)
                state.t_leagues = action.payload.api.leagues
        }
    }
})
export const {set_t_fixtures} = CurrentGameBetsSlice.actions
export default CurrentGameBetsSlice.reducer