import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { BandRequest } from "./BandRequest";


export const SeeBandRequests = () => {
    const { bandId } = useParams()
    const baseUrl = `/api/BandUserRequest/GetByBandId?id=${bandId}`
    const [requests, setRequests] = useState([])

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(requests => setRequests(requests))

    }
        , []
    )

    return (
        <>
            <div className="">
                {requests.map((request) => (<BandRequest request={request} key={request.id} />))}
            </div>
        </>

    )
}

export default SeeBandRequests