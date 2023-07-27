import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const EditProfile = () => {
    const { userId } = useParams()

    const [user, updateUser] = useState({
        bio: "",
    })

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/User/GetByIdWithBands?id=${userId}`)
            .then(response => response.json())
            .then((data) => {
                const userObject = data
                updateUser(userObject)
            })


    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`/api/User/${userId}}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/User/${user.id}`)
            })

    }
    return <article className="addMargin">
        <form className="updateRequest">
            <h2 className="request__title">Edit Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"> Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user?.name}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.name = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genres">Username:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user?.username}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.username = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="searchingFor">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user?.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bio"> Bio:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user?.bio}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.bio = evt.target.value
                                updateUser(copy)
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
                        value={user?.profilePic}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.profilePic = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profilePic">Genres:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user?.genres}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.genres = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profilePic">Skills:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user?.skills}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.skills = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </article>


}