import { NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { Card } from "reactstrap";

export const User = ({ user }) => {

    const navigate = useNavigate()

    return (
        // <div>
        //     <h4>{user.name}</h4>
        //     <img src={user.profilePic} alt="image" />
        // </div>
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
                <CardTitle tag="h5">
                    {user.name}
                </CardTitle>
            </CardBody>
        </Card>
    )
}