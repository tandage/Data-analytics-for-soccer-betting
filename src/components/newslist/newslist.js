import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {fetchNews, fetchSpecificNews} from "./newsSlice";
import {is_null} from "../../app/tool";
import {fetchHttpAPI} from "../../app/fetchHttpAPI";
import currentFixturesReducer from "../currentgamebets/currentgamebetsSlice";

const NewPiece = ({piece}) => {
    console.log(piece)
    const {name, id} = piece
    const LinkUrl = "/newdetail/" + id
    const t_fixtures = useSelector(state => state.currentFixtures.t_fixtures)
    // const [league_id,setLeague_id] = useState("")
    // useEffect( ()=>{
    //     if (!piece.related_id){
    //         console.log(t_fixtures)
    //         console.log(name)
    //         // const fixture =  t_fixtures.find(item=>item.homeTeam.team_name == name || item.awayTeam.team_name == name)[0]
    //         //
    //         // setLeague_id(fixture.league.league_id)
    //     }
    // },[piece])

    return (<Link to={{
        pathname: LinkUrl,
        state: {related_id: piece.related_id ?  piece.related_id : ""}
    }} className="list-group-item list-group-item-action text-truncate">
        {name}
    </Link>)
}


const HomeNewsList = ({q}) => {
    let f = state =>  state.news.data.list
    if (q)
        f = state => state.news.data.t_news
    const news = useSelector(f)
    const dispatch = useDispatch()
    const currentFixtures = useSelector(state => state.currentFixtures.fixtures)
    const [show,setShow] = useState(true)
    const maximumKeywords = 9
    const secondRequestsLimit = 3
    const [trigger,setTrigger] = useState([])
    const [keywords,setKeywords] = useState([])

    useEffect(() => {
        if (!q){
            is_null(currentFixtures)
            if (show && news.length >= maximumKeywords)
                setShow(false)
            let counter = 0
            setKeywords(currentFixtures.reduce((acc, cur) => {
                if (counter === secondRequestsLimit || news.length === maximumKeywords)
                    return acc
                const {league: {name: name = ""}} = cur
                if (!acc.some(item => (item === name))) {
                    acc.push({name:name})
                    dispatch(fetchNews({q: name}))
                    counter++
                }
                return acc
            }, keywords))

        }else{
            dispatch(fetchSpecificNews({q: q}))
            setShow(false)
        }

    }, [currentFixtures,trigger])

    const load_trigger = ()=>{
        setTrigger([])
    }

    return (
        <div className="card ">
            <div className="list-group list-group-flush ">
                <div className="card-header d-flex justify-content-between">
                    <span className="badge bg-primary rounded-0 pl-0 ml-0 rounded-pill ">{q ? q : "top news"}</span>
                </div>
                {news.map((piece, index) =>{

                    if (index <=maximumKeywords )
                        return  <NewPiece piece={piece} key={index} league_id={piece.related_id}/>
                    else
                        return <></>
                })}

                <a className={"text-muted text-decoration-underline  fw-bold text-center " + (show ? "" : "d-none")}
                       onClick={load_trigger}>more --></a>
            </div>
        </div>
    )
}


export {HomeNewsList, NewPiece}