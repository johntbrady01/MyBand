
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";


export const UserDetails = ({ userProfile }) => {
    const { userId } = useParams()
    const baseUrl = `/api/User/GetByIdWithBands?id=${userId}`
    const [user, setUser] = useState([])
    const [isMe, setIsMe] = useState(false)

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(user => {
            setUser(user)
            if (userProfile?.id === user.id) {
                setIsMe(true)

            }

        })

    }
        , [userId]
    )


    return <>
        <div>
            {
                (isMe)
                    ? <>
                        <Link to={`/updateprofile/${user.id}`}>Edit Profile</Link>
                    </>
                    : <>
                    </>
            }
        </div>
        <div className="profilePageContainer">
            <div className="profilePage">
                <div>
                    <h1>{user.name}</h1>
                    <img alt="Sample"
                        src={user.profilePic}
                        style={{
                            width: '12rem',
                            height: '12rem',
                            objectFit: 'cover'
                        }} />
                    <p>Bio: {user.bio}</p>
                    <p>Genres: {user.genres}</p>
                    <p>Skills: {user.skills}</p>
                </div>
                <h2>Bands:</h2>
                <div className="PhotoContainer">
                    {user?.bands?.map((band) => (
                        <Card
                            key={user.id}
                            style={{
                                width: '18rem',
                                color: "success",
                                margin: '2rem'

                            }}
                        >
                            <img
                                alt="Sample"
                                src={band.profilePic}
                                style={{
                                    width: '18rem',
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
                                    <Link to={`/Band/${band.id}`}>{band.name}</Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </>
}