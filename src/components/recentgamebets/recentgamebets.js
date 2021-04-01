import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {fetchRecentFixturesByDate} from "./recentgamebetsSlice";
import Modal from "../modal/modal";

const RecentGameBets = () => {
    const dispatch = useDispatch()
    const recentFixtures = useSelector(state => state.recentFixtures.fixtures) || []
    const today = moment()
    today.add(1, "days")
    const [date, setDate] = useState(today)

    useEffect(() => {
        if (recentFixtures == null || recentFixtures.length === 0)
            dispatch(fetchRecentFixturesByDate({delayDays: 1}))
        else {
            const delayDays = date.dayOfYear() - today.dayOfYear() + 1
            dispatch(fetchRecentFixturesByDate({delayDays: delayDays}))
        }

    }, [date])

    const datePlusOneDay = () => {
        if (date.dayOfYear() - (today.dayOfYear() + 1) >= 3)
            return
        date.add(1, "days")
        setDate(moment(date.format("YYYY-MM-DD")))
    }

    const dateMinusOneDay = () => {
        if (date.dayOfYear() - 1 <= today.dayOfYear())
            return
        date.subtract(1, "days")
        setDate(moment(date.format("YYYY-MM-DD")))
    }

    return (
        <div className="card bg-light bg-gradient" style={{overflow: 'scroll', height: '50em'}}>
            <div className="card-header d-flex justify-content-between">
                <span className="fw-bolder fs-4" onClick={dateMinusOneDay}> ← </span>
                <span className="fw-bolder fs-4 fst-italic">{date.format("YYYY-MM-DD")}</span>
                <span className="fw-bolder fs-4" onClick={datePlusOneDay}> → </span>
            </div>
            <div className="list-group">
                {recentFixtures.map((recentFixture, index) => <GameBet recentFixture={recentFixture} key={index} />)}
            </div>
        </div>
    )
}

const GameBet = ({recentFixture,}) => {
    const {league, event_date, homeTeam, awayTeam} = recentFixture
    const t = moment(event_date)
    const calendarTime = t.calendar()
    const [show, setShow] = useState(false);


    return (<>
        <a href="#" className="list-group-item list-group-item-action" onClick={()=>{
            setShow(true)
        }} >
            <div className="container">
                <div className="d-md-flex align-items-center mb-5 d-sm-block">
                    <img src={league.flag || league.logo} style={{height: "1rem", weight: "1rem"}} className='me-3'/>
                    {[calendarTime].map((item, index) => <small key={index}
                                                                className="text-muted me-2 fw-bold ">{item}</small>)}
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <figure className="figure">
                        <img src={homeTeam.logo} className="figure-img img-fluid rounded" alt={homeTeam.team_name}
                             style={{height: "1rem", weight: "1rem"}}/>

                    </figure>
                    <small>VS</small>
                    <figure className="figure">
                        <img src={awayTeam.logo} className="figure-img img-fluid rounded" alt={awayTeam.team_name}
                             style={{height: "1rem", weight: "1rem"}}/>
                    </figure>
                </div>
            </div>
        </a>
        <Modal title={recentFixture.round} onClose={() => setShow(false)} show={show}
               fixture_id={recentFixture.fixture_id}>
        </Modal>
    </>)

}

export default RecentGameBets