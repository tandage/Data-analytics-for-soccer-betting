import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import "./modal.css";
import {keysInHeadersOfFootballAPI} from "../../app/secure";

const Modal = props => {
    const {fixture_id, show} = props

    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };
    const fetch_data = async (fixture_id) => {
        const url = `https://api-football-v1.p.rapidapi.com/v2/predictions/${fixture_id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: keysInHeadersOfFootballAPI,
        })
        const data = await response.json()
        return data

    }
    let [prediction, setPrediction] = useState(null)
    useEffect(async () => {
        if (show) {
            const fixture_prediction = await fetch_data(fixture_id)
            setPrediction(fixture_prediction.api.predictions[0])
            prediction = fixture_prediction.api.predictions[0]
            console.log(prediction)
        }

    }, [fixture_id, show])

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);


    return (
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{enter: 0, exit: 300}}
        >
            <div className="modal text-center" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title">{props.title}</h4>
                    </div>
                    {prediction && <div className="modal-body container d-flex flex-column align-items-center w-100">

                        <span className="fw-bolder"> {prediction.advice}</span>
                        {prediction.advice != "No predictions available" &&
                        <div className="d-flex  my-2 w-100 justify-content-between">

                            <Table_piece list={["*", "forme", "att",
                                "def", "fish_law",
                                "h2h", "goals_h2h",]}></Table_piece>

                            <Table_piece
                                list={[prediction.teams.home.team_name, prediction.comparison.forme.home, prediction.comparison.att.home,
                                    prediction.comparison.def.home, prediction.comparison.fish_law.home,
                                    prediction.comparison.h2h.home, prediction.comparison.goals_h2h.home,]}></Table_piece>

                            <Table_piece
                                list={[prediction.teams.away.team_name, prediction.comparison.forme.away, prediction.comparison.att.away,
                                    prediction.comparison.def.away, prediction.comparison.fish_law.away,
                                    prediction.comparison.h2h.away, prediction.comparison.goals_h2h.away,]}></Table_piece>

                        </div>}

                        {prediction.advice != "No predictions available" && prediction.h2h.length !==0 &&
                        <span className="fw-bolder">in last few matches</span>}
                        {prediction.advice != "No predictions available" &&
                        <div className="d-flex  my-2 w-100 justify-content-between">
                            <Table_piece list={prediction.h2h.map(item => item.league.name)}></Table_piece>
                            <Table_piece list={prediction.h2h.map(item => {
                                if (item.awayTeam.team_id === prediction.teams.home.team_name)
                                    return item.goalsAwayTeam
                                return item.goalsHomeTeam
                            })}></Table_piece>
                            <Table_piece list={prediction.h2h.map(item => {
                                if (item.awayTeam.team_id === prediction.teams.away.team_name)
                                    return item.goalsAwayTeam
                                return item.goalsHomeTeam
                            })}></Table_piece>
                        </div>
                        }

                        {prediction.advice != "No predictions available" &&
                        <span className="fw-bolder">history data</span>}
                        {prediction.advice != "No predictions available" &&
                        <div className="d-flex  my-2 w-100 justify-content-between">
                            <Table_piece list={["played", "wins", "draws", "loses",]}></Table_piece>

                            <Table_piece list={[prediction.teams.home.last_h2h.played.home,
                                prediction.teams.home.last_h2h.wins.home,
                                prediction.teams.home.last_h2h.draws.home,
                                prediction.teams.home.last_h2h.loses.home]}></Table_piece>

                            <Table_piece list={[prediction.teams.away.last_h2h.played.away,
                                prediction.teams.away.last_h2h.wins.away,
                                prediction.teams.away.last_h2h.draws.away,
                                prediction.teams.away.last_h2h.loses.away]}></Table_piece>
                        </div>}


                    </div>}
                    <div className="modal-footer">
                        <button onClick={props.onClose} className="btn btn-outline-primary btn-sm">
                            got it
                        </button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

const Table_piece = (list = []) => {

    return (<div className="flex-column d-flex me-5 ">
        {list.list.map((item, index) =>
            <small className=" fs-6 text-muted fst-italic text-nowrap text-truncate" key={index}
            >{item}</small>)}
    </div>)
}

export default Modal;
