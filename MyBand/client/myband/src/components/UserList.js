import React, { useState, useEffect } from "react";
import { User } from "./User";


export const UserList = ({ userProfile }) => {
    const baseUrl = '/api/User/'
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(users => setUsers(users))

    }
        , []
    )

    return (
        <>
            <div>{userProfile?.name}</div>
            <div className="PhotoContainer">
                {users.map((user) => (<User user={user} key={user.id} />))}
            </div>
        </>

    )
}

export default UserList