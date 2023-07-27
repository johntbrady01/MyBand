import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom"

export const DeleteBand = () => {
    const navigate = useNavigate()
    const { bandId } = useParams()
    const baseUrl = `/api/Band/GetByIdWithUsers?id=${bandId}`
    const [band, setBand] = useState([])


    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(band => setBand(band))

    }
        , []
    )



    const deleteButton = () => {
        return <button onClick={() => {

            fetch(`/api/Band/${bandId}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate(`/bands`)
                })

        }} className="request__delete">Delete Band</button>
    }





    return (
        <div className="">
            <h1>Are You Sure You Want To Delete {band?.name}?</h1>
            <p>This Cannot Be Undone</p>
            <div className="button">{deleteButton()}</div>
        </div>
    )
}