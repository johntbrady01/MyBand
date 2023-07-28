import { NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";
import { Link } from "react-router-dom"

export const Band = ({ band }) => {



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
                    <Link to={`/Band/${band.id}`}>{band.name}</Link>
                </CardTitle>
            </CardBody>
        </Card>
    )
}