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
    const [hasRequested, setHasRequested] = useState(false)
    const requestedUrl = `/api/Band/GetByIdWithRequests?id=${bandId}`
    const [bandWithRequests, setBandWithRequests] = useState([])

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
        , [bandId, userProfile]
    )

    useEffect(() => {
        fetch(requestedUrl).then(res => (res.json())).then(bandWithRequests => {
            setBandWithRequests(bandWithRequests)
            if (bandWithRequests.users) {
                for (const user of bandWithRequests?.users) {
                    if (userProfile?.id === user?.id) {
                        setHasRequested(true)
                        break;
                    }
                }
            }
        })

    }
        , [bandId, userProfile]
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
        , [bandId, userProfile]
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
        <div>
            {
                (isLeader)
                    ? <>
                        <Link to={`/deleteband/${band.id}`}>Delete</Link>
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
                            objectFit: 'cover',
                            marginTop: '10px',
                            marginBottom: '30px'
                        }} />
                    <p>Bio: {band.bio}</p>
                    <p>Genres: {band.genres}</p>
                </div>
                <h2>Members:</h2>
                <div>
                    {
                        (isLeader)
                            ? <>
                                <Link to={`/editmembers/${band.id}`}>Edit</Link>
                            </>
                            : <>
                            </>
                    }
                    {
                        (inBand && !isLeader)
                            ? <>
                                <Link to={`/leaveband/${band.id}`}>Leave Band</Link>
                            </>
                            : <>
                            </>
                    }
                </div>
                <div className="PhotoContainer">
                    {band?.users?.map((user) => (
                        <div key={user.id}>
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
                                <div className='role'>{user.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <p>Searching For: {band.searchingFor}</p>
                {
                    (inBand || hasRequested)
                        ? <>

                        </>
                        : <Link to={`/bandrequest/${band.id}`}>Request to join band</Link>

                }

            </div>
        </div>

    </>
}