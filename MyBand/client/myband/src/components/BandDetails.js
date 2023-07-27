import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";


export const BandDetails = ({ userProfile }) => {
    const { bandId } = useParams()
    const baseUrl = `/api/Band/GetByIdWithUsers?id=${bandId}`
    const [band, setBand] = useState([])
    const [bandWithLeaders, setBandWithLeaders] = useState([])
    const leaderUrl = `/api/Band/GetByIdWithLeaders?id=${bandId}`
    const [isLeader, setIsLeader] = useState(false)
    const [inBand, setInBand] = useState(false)

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(band => {
            setBand(band)
            for (const user of band.users) {
                if (userProfile?.id === user?.id) {
                    setInBand(true)
                    break;
                }
            }
        })

    }
        , [bandId]
    )

    useEffect(() => {
        fetch(leaderUrl).then(res => (res.json()))
            .then(bandWithLeader => {
                setBandWithLeaders(bandWithLeader)
                for (const user of bandWithLeader.users) {
                    if (userProfile?.id === user?.id) {
                        setIsLeader(true)
                        break;
                    }
                }

            })

    }
        , [bandId]
    )



    return <>
        <div>
            {
                (isLeader)
                    ? <>
                        <Link to={`/updateband/${band.id}`}>Edit Band</Link>
                    </>
                    : <>
                    </>
            }
        </div>
        <div>
            {
                (isLeader)
                    ? <>
                        <Link to={`/bandrequests/${band.id}`}>See Requests To Join Band</Link>
                    </>
                    : <>
                    </>
            }
        </div>
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
                {
                    (inBand)
                        ? <>

                        </>
                        : <Link to={`/bandrequest/${band.id}`}>Request to join band</Link>

                }

            </div>
        </div>

    </>
}