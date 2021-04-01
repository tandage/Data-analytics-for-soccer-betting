import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {HomeNewsList} from "../newslist/newslist";
import {CardList} from "../cardlist/cardlist";
import CurrentGameBets from "../currentgamebets/currentgamebets";
import {useRouteMatch} from "react-router";
import {fetchTeamFixtures, fetchTeamLeagues, fetchTeamStatistics} from "../currentgamebets/currentgamebetsSlice";

const Head = ({fixture, id}) => {
    const dispatch = useDispatch()
    const t_leagues = useSelector(state => state.currentFixtures.t_leagues) || []
    const team_statistic = useSelector(state => state.currentFixtures.team_statistic) || []
    useEffect(() => {
        if (t_leagues.length === 0)
            dispatch(fetchTeamLeagues({team_id: id}))
        dispatch(fetchTeamStatistics({team_id: id}))
    }, [id])
    const name = fixture.homeTeam.team_id == id ? fixture.homeTeam.team_name : fixture.awayTeam.team_name
    const logo = fixture.homeTeam.team_id == id ? fixture.homeTeam.logo : fixture.awayTeam.logo

    const headlines = ["*"].concat()
    return (
        <div className="container-fluid mb-1 bg-light d-flex justify-content-between">
            <figure className="figure">
                <img src={logo} className="figure-img img-fluid rounded" alt="..."/>
                <figcaption className="figure-caption text-center fst-italic fw-bolder">{name}</figcaption>
            </figure>

            <div>
                <select className="form-select form-select-sm" aria-label=".form-select-sm example">

                    {t_leagues.map((item,index) => {
                        if (index == 0)
                            return <option defaultValue key={index}
                                value={item.league_id}>{item.name + " " + (item.country_code ? item.country_code : "") + " " + item.season}</option>
                        return <option key={index}
                            value={item.league_id}>{item.name + " " + (item.country_code ? item.country_code : "") + " " + item.season}</option>
                    })}

                </select>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>)
}

const Team_or_League = () => {
    const currentFixtures = useSelector(state => state.currentFixtures.fixtures) || []
    // const spareFixtures =  useSelector(state => state.currentFixtures.t_fixtures) || []
    // const currentFixtures = originalFixtures.concat(spareFixtures)
    const dispatch = useDispatch()
    const {id} = useParams()
    const match = useRouteMatch()
    const t_fixtures = useSelector(state => state.currentFixtures.t_fixtures) || []
    // let fixtures,fixture,name,logo,team_names ,league_names
    const fixture = currentFixtures.filter(item => item.homeTeam.team_id == id || item.awayTeam.team_id == id)[0]
    useEffect(() => {
        if (t_fixtures == null || t_fixtures.length === 0)
            dispatch(fetchTeamFixtures({team_id: id}))
    }, [id])

    // if (match.path.includes("league")){
    //
    //     fixtures = currentFixtures.filter(item=>item.league_id == id)
    //
    //     fixture = fixtures[0]
    //
    //     name = fixture.league.name
    //     logo = fixture.league.logo
    //     team_names = fixtures.reduce((acc,cur)=>{
    //         if (!acc.some(item=>item.id == cur.homeTeam.team_id ||  item.name == cur.homeTeam.team_name))
    //             acc.push({id:cur.homeTeam.team_id,name:cur.homeTeam.team_name})
    //
    //         if (!acc.some(item=>item.id == cur.awayTeam.team_id ||  item.name == cur.awayTeam.team_name))
    //             acc.push({id:cur.awayTeam.team_id,name:cur.awayTeam.team_name})
    //
    //         return acc
    //     },[])
    //
    //
    //     league_names = currentFixtures.filter(item=>item.league_id !== id).reduce((acc,cur)=>{
    //         if (!acc.some(item=>item.id == cur.league_id || item.name==cur.league.name))
    //             acc.push({name:cur.league.name,id:cur.league_id})
    //         return acc
    //     },[])
    // }
    // else{

    // fixture = currentFixtures.filter(item => item.homeTeam.team_id == id || item.awayTeam.team_id == id)[0]
    // name = fixture.homeTeam.team_id == id ? fixture.homeTeam.team_name : fixture.awayTeam.team_name
    // logo = fixture.homeTeam.team_id == id ? fixture.homeTeam.logo : fixture.awayTeam.logo

    // team_names = fixtures.reduce((acc, cur) => {
    //     if (cur.homeTeam.team_id == id && !acc.some(item => item.id == id || item.name == name || item.name ==cur.homeTeam.team_name))
    //         acc.push({name: cur.awayTeam.team_name, id: cur.awayTeam.team_id, type: "team"})
    //
    //     if (cur.awayTeam.team_id == id && !acc.some(item => item.id == id || item.name == name || item.name ==cur.awayTeam.team_name))
    //         acc.push({name: cur.homeTeam.team_name, id: cur.homeTeam.team_id, type: "team"})
    //     return acc
    // }, [])
    //
    // league_names = fixtures.reduce((acc, cur) => {
    //     if (!acc.some(item => item.id === id || item.name == name || item.name ==cur.league.name))
    //         acc.push({name: cur.league.name, id: cur.league_id, type: "league"})
    //     return acc
    // }, [])
    // }

    return (
        <>
            <div className="row row-cols-2 d-flex mt-1 justify-content-center flex-nowrap">
                <div lassName="col-9  ">
                    <Head fixture={fixture} id={id}></Head>
                    <CurrentGameBets fixtures={t_fixtures}/>
                </div>
                <div className="col-3 ">
                    <HomeNewsList q={fixture.homeTeam.team_id == id ? fixture.homeTeam.team_name : fixture.awayTeam.team_name}/>
                    {/*<div>*/}
                    {/*    <CardList q={league_names}/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <CardList q={team_names}/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>

    )
}


export default Team_or_League
