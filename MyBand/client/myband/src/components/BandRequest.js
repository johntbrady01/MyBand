import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom"
import { Table } from "reactstrap"

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





    return <>
        <div className="requestDiv">

            <Table bordered >
                <tbody>
                    <tr>
                        <th scope="row" style={{ width: '20rem' }}>
                            <Link to={`/User/${request.user.id}`}>{request?.user?.name}</Link>
                        </th>
                        <td style={{ width: '20rem' }}>
                            {request?.role?.name}
                        </td>
                        <td style={{ width: '20rem' }}>
                            {request?.note}
                        </td>
                        <td style={{ width: '5rem', display: 'flex' }}>
                            <div className="button" style={{ width: '5rem', paddingRight: '7rem' }}>{acceptButton()}</div>
                            <div className="button" style={{ width: '5rem' }}>{deleteButton()}</div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </>
}