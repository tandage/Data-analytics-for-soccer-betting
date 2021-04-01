import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useState} from "react";

const Piece = ({piece, q}) => {
    const {name, id} = piece

    let key = "league"
    if (piece.type)
        key = piece.type
    if (q === "awayTeam" || q === "homeTeam")
        key = "team"

    const LinkUrl = `/${key}/` + id

    return (<Link to={LinkUrl}
                  className="list-group-item list-group-item-action text-truncate">
        {name}
    </Link>)
}

const CardList = ({list = [], scrollable = false, label}) => {
    let scroll = {}
    if (scrollable)
        scroll =  {overflow: 'scroll', height: '20em'}
    const mappedList = list.map(item => ({id: item.team_id, name: item.name}))
    const len = mappedList.length <= 8 ? mappedList.length : 8
    const cutList = mappedList.slice(0, len)


    // const currentFixtures = useSelector(state => state.currentFixtures.fixtures) || []
    // let list = currentFixtures
    // if (q instanceof Array) {
    //     list = q
    // }
    // else{
    //     if (list == null || list.length == 0)
    //         return <></>
    //
    //     list = list.reduce((acc, cur) => {
    //
    //         if (q == "leagues" && !acc.some(item => item.name == cur.league.name))
    //             acc.push({id: cur.league_id, name: cur.league.name ,})
    //         else if (q == "awayTeam" && !acc.some(item => item.name == cur.awayTeam.team_name))
    //             acc.push({name: cur.awayTeam.team_name, id: cur.awayTeam.team_id})
    //         else if (q == "homeTeam" && !acc.some(item => item.name == cur.homeTeam.team_name))
    //             acc.push({name: cur.homeTeam.team_name, id: cur.homeTeam.team_id})
    //         else {
    //             if (cur.homeTeam.team_name === q)
    //                 acc.push({name: cur.league.name + " + " + q, id: cur.homeTeam.team_id , type:"team"})
    //             else if (cur.league.name === q)
    //                 acc.push({name: cur.homeTeam.team_name + "  vs  " + cur.awayTeam.team_name, id: cur.league_id,type:"league"})
    //             else if (cur.awayTeam.team_name === q)
    //                 acc.push({name: cur.league.name + " + " + q, id: cur.awayTeam.team_id,type:"team"})
    //         }
    //
    //         return acc
    //     }, [])
    // }
    //
    // const len = list.length <= 8 ? list.length : 8;
    //
    // list = (Array.from(list).slice(0, len))

    return (
        <div className="card my-2" style={scroll}>
            <div className="list-group list-group-flush ">
                <div className="card-header d-flex justify-content-between">
                    <span className="badge bg-primary rounded-0 pl-0 ml-0 rounded-pill">{label}</span>

                </div>
                {
                    cutList.map((piece, index) => {
                    return <Piece piece={piece} key={index} q={label}/>
                })}
            </div>
        </div>
    )
}


export {CardList, Piece}