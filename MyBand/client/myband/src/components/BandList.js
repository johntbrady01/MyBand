import React, { useState, useEffect } from "react";
import { Band } from "./Band";


export const BandList = () => {
    const baseUrl = '/api/Band/'
    const [bands, setBands] = useState([])

    useEffect(() => {
        fetch(baseUrl).then(res => (res.json())).then(bands => setBands(bands))

    }
        , []
    )

    return (
        <div class="PhotoContainer">
            {bands.map((band) => (<Band band={band} key={band.id} />))}
        </div>

    )
}

export default BandList