import { NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";

export const Band = ({ band }) => {

    const navigate = useNavigate()

    return (
        <Card
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
                        justifyContent: 'center'
                    }}
                >
                    {band.name}
                </CardTitle>
            </CardBody>
        </Card>
    )
}