import React, {useEffect} from "react";

import {CardList} from "../../cardlist/cardlist";
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {HomeNewsList} from "../newslist.js"
import {fetchTeamNamesByLeagueId} from "../../currentgamebets/currentgamebetsSlice";

const NewDetail = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const t_teams = useSelector(state=>state.currentFixtures.t_teams)
    const t_fixtures = useSelector(state => state.currentFixtures.t_fixtures)
    const leagues = useSelector(state=>state.currentFixtures.leagues)
    let news = useSelector(state => state.news.data.list)
    let t_news = useSelector(state => state.news.data.t_news)
    let newPiece = news.find(item => item.id == id)
    if (!newPiece)
        newPiece = t_news.find(item => item.id == id)
    // const location = useLocation()

    useEffect(()=>{
        let related_id = leagues.find(league=>league.name == newPiece.q)

        if (related_id)
            related_id = related_id.league_id
        else{
            related_id =t_fixtures.find(item=>item.awayTeam.team_name  || item.homeTeam.team_name)
            related_id = related_id.league_id
        }


        dispatch(fetchTeamNamesByLeagueId({league_id:related_id}))
        

    },[leagues])

    const t = moment(newPiece.datePublished)
    const calendarTime = t.calendar()

    // const b = useHistory()
    // const c = useRouteMatch()
    // console.log(id)
    // console.log(newPiece)
    // console.log(news)
    // console.log(location)
    // console.log(b)
    // console.log(c)
    return (
        <div className="row row-cols-2 d-flex mt-1 justify-content-center flex-nowrap">
            <div className="col-8 ">
                <div className="container-fluid bg-light ">
                    <h1 className="lead display-4 mt-0 font-weight-bolder text-break"><b>{newPiece.name} </b></h1>
                    <p className="lead text-end  font-italic"><b>{calendarTime}</b></p>
                    <p className="lead text-end mb-0 pb-0 fst-italic fs-6">
                        <b>{newPiece.provider[0].name || "Anonymous"}</b></p>
                </div>
                <picture>
                    <source srcSet={newPiece.image.contentUrl}/>
                    <img src={newPiece.image.thumbnail.contentUrl} className="d-block w-100"
                         style={{"height": "25rem"}}/>
                </picture>
                {newPiece.description}
            </div>
            <div className="col-3 ">

                <HomeNewsList q={newPiece.q} />
                <CardList list={t_teams} scrollable={true} label="teams"/>
            </div>
        </div>
    )
}


export default NewDetail
