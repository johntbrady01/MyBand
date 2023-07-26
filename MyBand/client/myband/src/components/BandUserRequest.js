import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom"

export const BandUserRequest = ({ userProfile }) => {


    const [bandUserRequest, updateBandUserRequest] = useState({
        userId: 1,
        bandId: 1,
        roleId: 1,
        isLeader: false,
        isAccepted: false,
        note: "",
        sentByBand: false

    })
    const [roles, setRoles] = useState([])
    const { bandId } = useParams()
    const baseUrl = `/api/Band/GetByIdWithUsers?id=${bandId}`
    const [band, setBand] = useState([])

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(band => setBand(band))

    }
        , [bandId]
    )

    const navigate = useNavigate()

    useEffect(
        () => {

            fetch(`/api/Role`)
                .then(response => response.json())
                .then((rolesArray) => {
                    setRoles(rolesArray)
                })

        },
        []
    )



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const bandUserRequestToSendToApi = {
            userId: userProfile.id,
            bandId: bandId,
            roleId: bandUserRequest.roleId,
            isLeader: false,
            isAccepted: false,
            note: bandUserRequest.note,
            sentByBand: false
        }


        return fetch(`/api/BandUserRequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bandUserRequestToSendToApi)

        })
            .then(response => response.json())
            .then(() => {
                navigate(`/Band/${band.id}`)
            })
    }
    return <article className="addMargin">
        <form className="requestForm">
            <h2 className="requestForm__title">Request to join {band.name}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="not">Note:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="I'm really good I swear..."
                        value={bandUserRequest.note}
                        onChange={
                            (evt) => {
                                const copy = { ...bandUserRequest }
                                copy.note = evt.target.value
                                updateBandUserRequest(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="role">What role would you play in the band?</label>
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...bandUserRequest }
                                copy.roleId = parseInt(evt.target.value)
                                updateBandUserRequest(copy)
                            }}>
                        {roles.map((role) => {
                            return <option
                                key={role.id}
                                value={parseInt(role.id)}
                            >{role.name}
                            </option>

                        })}
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}

                className="btn btn-primary">
                Submit Request
            </button>
        </form>

    </article>
}