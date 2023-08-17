import { NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";
import { Link } from "react-router-dom"

export const User = ({ user }) => {

    const navigate = useNavigate()

    return (
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
            <CardBody >
                <CardTitle tag="h5" >
                    <Link to={`/User/${user.id}`}>{user?.name}</Link>
                </CardTitle>
            </CardBody>
        </Card>
    )
}