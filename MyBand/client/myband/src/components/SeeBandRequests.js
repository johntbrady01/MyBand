import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { BandRequest } from "./BandRequest";
import { Table } from "reactstrap"


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
            <Table >
                <thead>
                    <tr>
                        <th style={{ paddingRight: '6.5rem' }}>
                            Name
                        </th>
                        <th style={{ paddingRight: '6.5rem' }}>
                            Role
                        </th>
                        <th style={{ paddingRight: '6.5rem' }}>
                            Note
                        </th>
                        <th style={{ paddingRight: '6.5rem' }}>
                            Accept/Decline
                        </th>
                    </tr>
                </thead>
            </Table >
            <div className="">
                {requests.map((request) => (<BandRequest request={request} key={request.id} />))}
            </div>
        </>

    )
}

export default SeeBandRequests