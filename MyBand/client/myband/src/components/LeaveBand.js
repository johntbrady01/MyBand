import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";
import { Link, useParams } from "react-router-dom"

export const LeaveBand = ({ member, userProfile }) => {
    const navigate = useNavigate()

    const leaveButton = () => {
        return <button onClick={() => {

            fetch(`/api/BandUserRequest/${member?.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate(`/Band/${member?.bandId}`)
                })

        }} className="request__delete">Yes, Leave</button>
    }





    return (
        <>
            <div className="requestDiv">
                {
                    (member?.userId == userProfile?.id)
                        ? <>
                            <div>
                                <h1>Are you sure you want to leave {member?.band?.name}</h1>
                                <div className="button">{leaveButton()}</div>
                            </div>
                        </>
                        : <>
                        </>
                }
            </div>
        </>
    )
}