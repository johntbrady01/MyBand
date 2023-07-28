import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { LeaveBand } from "./LeaveBand";


export const SeeLeaveBand = ({ userProfile }) => {
    const { bandId } = useParams()
    const baseUrl = `/api/BandUserRequest/GetMembersByBandId?id=${bandId}`
    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(members => setMembers(members))

    }
        , []
    )

    return (
        <>
            <div className="">
                {members.map((member) => (<LeaveBand member={member} key={member.id} userProfile={userProfile} />))}
            </div>
        </>

    )
}

export default SeeLeaveBand