import React, { useState } from "react";

export default function MagicCard ({ name, image_uris, card_faces}) {

    const [isFaces, setIsFaces] = useState(card_faces)

    card_faces ? setIsFaces(card_faces[0].image_uris.small) : null


    return (
        <div>
            <p>{name}</p>
        </div>
    )
}