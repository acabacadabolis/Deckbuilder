import React, { useEffect, useState } from "react";

export default function MagicCard ({ name, image_uris, card_faces}) {

    const [isFaces, setIsFaces] = useState(card_faces)
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() =>{
        image_uris ? "" : setIsFaces(card_faces[0].image_uris.small)
    },[])

    function handleClick(){
        isFaces === card_faces[0].image_uris.small ? setIsFaces(card_faces[1].image_uris.small) 
        : setIsFaces(card_faces[0].image_uris.small)
    }

    const displayCard = image_uris ?
    (<img 
        src={image_uris.small} 
        alt={name} 
        className="MagicCard" /> 
     ) : (
    <img src={isFaces} 
        alt={name}
        onClick={handleClick}
        />
    )

    function handleFocus () {
        setIsFocus(prev => !prev)
    }

    function handleBlur () {
        setIsFocus(prev => !prev)
    }

    return (
        <div id="magic-card"
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur} >
            {displayCard}
            {isFocus ? <button>Add to Deck</button> : null}
        </div>
    )
}