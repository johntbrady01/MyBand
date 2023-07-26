import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";


export const BandDetails = () => {
    const { bandId } = useParams()
    const baseUrl = `/api/Band/GetByIdWithUsers?id=${bandId}`
    const [band, setBand] = useState([])

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(band => setBand(band))

    }
        , [bandId]
    )


    return <>
        <div className="profilePageContainer">
            <div className="profilePage">
                <div>
                    <h1>{band.name}</h1>
                    <img alt="Sample"
                        src={band.profilePic}
                        style={{
                            width: '18rem',
                            height: '12rem',
                            objectFit: 'cover'
                        }} />
                    <p>{band.bio}</p>
                    <p>Genres: {band.genres}</p>
                </div>
                <h2>Members:</h2>
                <div className="PhotoContainer">
                    {band?.users?.map((user) => (
                        <>
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
                                        src={user.profilePic}
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
                                            <Link to={`/User/${user.id}`}>{user?.name}</Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                                {user.role}
                            </div>
                        </>
                    ))}
                </div>
                <p>Searching For: {band.searchingFor}</p>
            </div>
        </div>
    </>
}