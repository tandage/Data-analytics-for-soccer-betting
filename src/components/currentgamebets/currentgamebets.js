import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentFixturesByDate, set_t_fixtures} from "./currentgamebetsSlice";
import moment from "moment";
import {fetchHttpAPI} from "../../app/fetchHttpAPI";
import {keysInHeadersOfFootballAPI} from "../../app/secure";
import {useHistory} from "react-router";
import Modal from "../modal/modal";


const judge_st_order = (object) => {
    if (!object || !object.statusShort)
        return false
    return (object.statusShort === "PST" || object.statusShort === "CANC" || object.statusShort === "NS")
}


const order_by_statusShort = (a, b) => {
    if (judge_st_order(a))
        return -1
    else if (judge_st_order(b))
        return -1
    else
        return 0
}

const CurrentGameBets = ({fixtures}) => {

    const dispatch = useDispatch()
    const [currentFixtures, setCurrentFixtures] = useState([])
    const [showFullInfo, setShowFullInfo] = useState({})
    const [searchContent, setSearchContent] = useState("")
    let _currentFixtures = useSelector(state => state.currentFixtures.fixtures) || []

    if (fixtures)
        _currentFixtures = fixtures

    useEffect(() => {
        if ((_currentFixtures == null || _currentFixtures.length === 0) && !fixtures)
            dispatch(fetchCurrentFixturesByDate())
        const t_currentFixtures = [..._currentFixtures]
        t_currentFixtures.sort((former, latter) => order_by_statusShort(former, latter))
        setCurrentFixtures(t_currentFixtures)
    }, [_currentFixtures])

    // const fetch_fixtures_by_team_id = async () => {
    //     const url = `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${team_id}?timezone=Europe%2FLondon`
    //     const response = await fetchHttpAPI(url, {
    //         method: 'GET',
    //         headers: keysInHeadersOfFootballAPI
    //     })
    //
    //     let list = response.api.fixtures
    //     const len = list.length <= 30 ? list.length : 30
    //     list = list.slice(list.length - len, list.length)
    //     await setCurrentFixtures(currentFixtures.concat(list))
    //     await dispatch(set_t_fixtures(list))
    //     setShow(false)
    // }

    const is_match = (currentFixture) => {
        const q = searchContent.toLowerCase()
        if (currentFixture)
            return (currentFixture.homeTeam.team_name.toLowerCase().includes() ||
                currentFixture.awayTeam.team_name.toLowerCase().includes(q) ||
                currentFixture.league.name.toLowerCase().includes(q) ||
                currentFixture.league.country.toLowerCase().includes(q) ||
                currentFixture.round.toLowerCase().includes(q) ||
                currentFixture.status.toLowerCase().includes(q) ||
                currentFixture.statusShort.toLowerCase().includes(q) ||
                (currentFixture.referee && currentFixture.referee.toLowerCase().includes(q)))


    }

    return (

        <div className="card bg-light bg-gradient"
             style={{overflow: 'scroll', height: '50em'}}>
            <div className="card-header text-center">
                <input className="form-control " type="text" placeholder="search" value={searchContent}
                       onChange={(e) => setSearchContent(e.target.value)}/>
            </div>

            <div className="list-group">
                {currentFixtures.map((currentFixture, index) => {
                        if (is_match(currentFixture))
                            return <CurrentGameBet key={index} currentFixture={currentFixture} showFullInfo={showFullInfo}
                                                   setShowFullInfo={setShowFullInfo}/>
                    }
                )}
            </div>
        </div>
    )
}

const CurrentGameBet = ({currentFixture, showFullInfo, setShowFullInfo}) => {
    const history = useHistory()
    const [show, setShow] = useState(false);

    const {league, event_date, homeTeam, awayTeam, elapsed, venue, referee, statusShort, score, round, firstHalfStart, secondHalfStart} = currentFixture
    const t = moment(event_date)
    const firstHalfStart_t = "FHS:" + moment(firstHalfStart * 1000).format('LT')
    const secondHalfStart_t = "SHS:" + moment(secondHalfStart * 1000).format('LT')
    const elapsed_t = "elapsed: " + elapsed + " mins"
    const calendarTime = t.calendar()

    const is_showFullInfo = () => {
        let t = {...showFullInfo}
        if (showFullInfo[currentFixture.fixture_id])
            t[currentFixture.fixture_id] = false
        else
            t[currentFixture.fixture_id] = true

        setShowFullInfo(t)
    }

    return (
        <>
            <a href="#" className="list-group-item list-group-item-action " onClick={() => {
                if (!judge_st_order(currentFixture))
                    setShow(true)
            }}>

                <div className="container ">
                    <div className="d-flex align-items-center  text-truncate mb-5">
                        <img src={league.flag || league.logo} style={{height: "1rem", weight: "1rem"}}
                             className='me-3'/>
                        {[calendarTime, league.name, statusShort].map((item, index) => {
                            const c = index !== 2 ? "me-2 fw-bold" : "me-2 fw-bold text-danger"
                            return <small key={index} className={c}>{item}</small>
                        })}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <figure className="figure text-center">
                            <img src={homeTeam.logo} className="figure-img img-fluid rounded" alt=""
                                 style={{height: "3rem", weight: "3rem"}} onClick={(e) => {
                                e.stopPropagation()
                                history.push("/team/" + homeTeam.team_id)
                            }}/>
                            <figcaption className="figure-caption fs-6 text-muted fst-italic text-wrap"
                                        style={{width: "6rem"}}>{homeTeam.team_name}</figcaption>
                            {!judge_st_order(currentFixture) &&
                            <figcaption className="figure-caption fs-6 text-danger  fst-italic text-wrap"
                                        style={{width: "6rem"}}>{currentFixture.goalsHomeTeam}</figcaption>}
                        </figure>
                        <span>VS</span>
                        <figure className="figure text-center">
                            <img src={awayTeam.logo} className="figure-img img-fluid rounded" alt=""
                                 style={{height: "3rem", weight: "3rem"}} onClick={(e) => {
                                e.stopPropagation()
                                history.push("/team/" + awayTeam.team_id)
                            }}/>
                            <figcaption className="figure-caption fs-6 text-muted fst-italic "
                                        style={{width: "6rem"}}>{awayTeam.team_name}</figcaption>
                            {!judge_st_order(currentFixture) &&
                            <figcaption className="figure-caption fs-6  text-danger  fst-italic "
                                        style={{width: "6rem"}}>{currentFixture.goalsAwayTeam}</figcaption>}
                        </figure>
                    </div>

                    <div className="text-center mt-5 ms-auto fw-bold" onClick={(e) => {
                        e.stopPropagation()
                        is_showFullInfo()
                    }}>
                        {!judge_st_order(currentFixture) &&
                        <small>{showFullInfo[currentFixture.fixture_id] ? "↑ click me" : "↓ click me"}</small>}
                    </div>

                    {!judge_st_order(currentFixture) && showFullInfo[currentFixture.fixture_id] &&
                    <div className="d-flex justify-content-between mt-1 mx-auto flex-nowrap">
                        <div className="d-flex flex-column ms-1">
                            {[elapsed_t, firstHalfStart_t, secondHalfStart_t,].map((item, index) => {
                                    if (item) return <small className="text-muted me-2 fw-normal fst-italic"
                                                            key={index}>{item}</small>
                                }
                            )}
                        </div>

                        <div className="d-flex flex-column ms-1 text-end">
                            {[round, venue, referee].map((item, index) => {
                                    if (item) return <small className="text-muted me-2 fw-bold text-success"
                                                            key={index}>{item}</small>
                                }
                            )}
                        </div>


                    </div>}
                    <div className="d-flex flex-column-reverse align-items-center mx-auto mt-5 ">
                        {showFullInfo[currentFixture.fixture_id] && Object.entries(score).map((item, index) => {
                                if (item && item[0] && item[1]) return <small className=" me-2 fw-bolder text-warning"
                                                                              key={index}>{item[0]} : {item[1]}</small>
                            }
                        )}
                    </div>


                </div>

            </a>
            <Modal title={currentFixture.round} onClose={() => setShow(false)} show={show}
                   fixture_id={currentFixture.fixture_id}>

            </Modal></>)
}


export default CurrentGameBets
