import {keysInHeadersOfFootballAPI} from "./secure";

const fetchHttpAPI = async (url,configuration={headers:keysInHeadersOfFootballAPI,method:"GET"}) => {
    const response = await fetch(url,configuration)
    const data = await response.json()
    return data
}

export {fetchHttpAPI}