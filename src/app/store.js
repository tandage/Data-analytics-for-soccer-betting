import { configureStore } from '@reduxjs/toolkit'
import newsReducer from "../components/newslist/newsSlice"
import recentFixturesReducer from "../components/recentgamebets/recentgamebetsSlice"
import currentFixturesReducer from "../components/currentgamebets/currentgamebetsSlice"
import userReducer from "../components/header/modals/usersSlice"
import noticeReducer from "../components/notice/noticeSlice"
export default configureStore({
    reducer: {
        news:newsReducer,
        recentFixtures:recentFixturesReducer,
        currentFixtures:currentFixturesReducer,
        user:userReducer,
        notice:noticeReducer,
    },
})
