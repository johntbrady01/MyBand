import { NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const User = ({ user }) => {

    const navigate = useNavigate()

    return (
        <div>
            <h4>{user.name}</h4>
            <img src={user.profilePic} alt="image" />
        </div>
    )
}