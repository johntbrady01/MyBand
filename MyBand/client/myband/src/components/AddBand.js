import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddBand = ({ userProfile }) => {

    const [band, update] = useState({
        name: "",
        bio: "",
        profilePic: "",
        genres: "",
        searchingFor: ""
    })

    const [bandUserRequest, updateBandUserRequest] = useState({
        userId: 1,
        bandId: 1,
        roleId: 1,
        isLeader: true,
        isAccepted: true,
        note: "",
        sentByBand: false

    })
    const [roles, setRoles] = useState([])

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

        const bandToSendToApi = {
            name: band.name,
            bio: band.bio,
            profilePic: band.profilePic,
            genres: band.genres,
            searchingFor: band.searchingFor
        }

        const bandUserRequestToSendToApi = {
            userId: userProfile.id,
            roleId: bandUserRequest.roleId,
            isLeader: true,
            isAccepted: true,
            note: "Leader",
            sentByBand: false
        }

        return fetch(`/api/Band`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bandToSendToApi)

        })
            .then(response => response.json())
            .then((band) => { bandUserRequestToSendToApi.bandId = band })
            .then(() => {
                return fetch(`/api/BandUserRequest`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bandUserRequestToSendToApi)

                })

            })
            .then(() => {
                navigate("/bands")
            })
    }
    return <article className="addMargin">
        <form className="requestForm">
            <h2 className="requestForm__title">New Band</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Band Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The Bottles, AB-CD, Pistols N Flowers..."
                        value={band.name}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genres">Genres:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Rock, Pop, Jazz..."
                        value={band.genres}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.genres = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="searchingFor">What are you searching for:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Bass, Piano, Guitar, Vocals..."
                        value={band.searchingFor}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.searchingFor = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bio">Band's Bio:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Bio..."
                        value={band.bio}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.bio = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profilePic">Profile Pic:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="https://myprofilepic.jpg"
                        value={band.profilePic}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.profilePic = evt.target.value
                                update(copy)
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
                Create Band
            </button>
        </form>

    </article>
}