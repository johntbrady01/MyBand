import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const UpdateBand = () => {
    const { bandId } = useParams()

    const [band, updateBand] = useState({
        bio: "",
    })

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/Band/GetByIdWithUsers?id=${bandId}`)
            .then(response => response.json())
            .then((data) => {
                const bandObject = data
                updateBand(bandObject)
            })


    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`/api/Band/${bandId}}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(band)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/Band/${band.id}`)
            })

    }
    return <article className="addMargin">
        <form className="updateRequest">
            <h2 className="request__title">Edit Band</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Band Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={band?.name}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.name = evt.target.value
                                updateBand(copy)
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
                        value={band?.genres}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.genres = evt.target.value
                                updateBand(copy)
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
                        value={band?.searchingFor}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.searchingFor = evt.target.value
                                updateBand(copy)
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
                        value={band?.bio}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.bio = evt.target.value
                                updateBand(copy)
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
                        value={band?.profilePic}
                        onChange={
                            (evt) => {
                                const copy = { ...band }
                                copy.profilePic = evt.target.value
                                updateBand(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Band
            </button>
        </form>
    </article>


}