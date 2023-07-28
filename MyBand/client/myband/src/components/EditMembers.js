import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";
import { Link, useParams } from "react-router-dom"

export const EditMembers = ({ member, userProfile }) => {
    const navigate = useNavigate()

    const makeLeaderButton = () => {
        {
            return <button onClick={() => {
                fetch(`/api/BandUserRequest`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: member.id,
                        userId: member.userId,
                        roleId: member.roleId,
                        bandId: member.bandId,
                        isLeader: true,
                        isAccepted: member.isAccepted,
                        note: member.note,
                        sentByBand: member.sentByBand

                    })

                })
                    .then(() => {
                        navigate(`/Band/${member.bandId}`)
                    })

            }} className="request__accept">Make Leader</button>
        }

    }

    const deleteButton = () => {
        return <button onClick={() => {

            fetch(`/api/BandUserRequest/${member.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate(`/Band/${member.bandId}`)
                })

        }} className="request__delete">Remove From Band</button>
    }





    return (
        <>
            <div className="requestDiv">
                {
                    (member?.userId == userProfile.id)
                        ? <>
                        </>
                        : <>
                            <div>
                                <Card
                                    style={{
                                        width: '12rem',
                                        color: "success",
                                        margin: '2rem'

                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        src={member?.user?.profilePic}
                                        style={{
                                            width: '12rem',
                                            height: '12rem',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5"
                                            style={{
                                                display: 'flex',
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Link to={`/User/${member.user.id}`}>{member?.user?.name}</Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                                {member?.user.role}
                            </div>
                            {
                                (member?.isLeader)
                                    ? <>
                                    </>
                                    : <>
                                        <div className="button">{makeLeaderButton()}</div>
                                    </>

                            }
                            <div className="button">{deleteButton()}</div>
                        </>
                }
            </div>
        </>
    )
}