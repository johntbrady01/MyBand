import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom"

export const BandRequest = ({ request }) => {
    const navigate = useNavigate()

    const acceptButton = () => {
        {
            return <button onClick={() => {
                fetch(`/api/BandUserRequest`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: request.id,
                        userId: request.userId,
                        roleId: request.roleId,
                        bandId: request.bandId,
                        isLeader: request.isLeader,
                        isAccepted: true,
                        note: request.note,
                        sentByBand: request.sentByBand

                    })

                })
                    .then(() => {
                        navigate(`/Band/${request.bandId}`)
                    })

            }} className="request__accept">Accept</button>
        }

    }

    const deleteButton = () => {
        return <button onClick={() => {

            fetch(`/api/BandUserRequest/${request.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate(`/Band/${request.bandId}`)
                })

        }} className="request__delete">Delete</button>
    }





    return (
        <div className="requestDiv">
            <p>Name: <Link to={`/User/${request.user.id}`}>{request?.user?.name}</Link></p>
            <p>Role: {request?.role?.name}</p>
            <p>Note: {request?.note}</p>
            <div className="button">{acceptButton()}</div>
            <div className="button">{deleteButton()}</div>
        </div>
    )
}