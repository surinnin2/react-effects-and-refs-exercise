import React from "react"

const Card = ({image, value, suit, code}) => {
    return (
        <div>
            <img src={image} alt={value}></img>
        </div>
    )
}

export default Card