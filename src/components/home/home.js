import SlideShow from "../slideshow/slideshow";
import { HomeNewsList} from "../newslist/newslist";
import RecentGameBets from "../recentgamebets/recentgamebets";
import CurrentGameBets from "../currentgamebets/currentgamebets";
import React, {useEffect} from "react";
import {CardList} from "../cardlist/cardlist";
import {useDispatch} from "react-redux";
import {fetchAllLeagues} from "../currentgamebets/currentgamebetsSlice";
import Footer from "../footer/footer";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAllLeagues())
    },[dispatch])

    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col-8 mt-1">
                    <SlideShow/>
                </div>
                <div className="col-4">
                    <HomeNewsList />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-8 mt-1">
                    <CurrentGameBets/>
                </div>
                <div className="col-4">
                    <RecentGameBets/>
                </div>
            </div>

            <div className="row pt-3">
                <Footer> </Footer>
            </div>
        </div>
    )
}

export default Home