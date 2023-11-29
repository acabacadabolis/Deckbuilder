import React, { useEffect, useState } from "react";
import { redirect, useActionData, useNavigate } from "react-router-dom";

export default function MagicDeckCard ({ deckid, setMtgDeck , card, setRefresh}) {

    const [image, setImage] = useState(card.card_faces[0].image)
    
    function handleClick(){
        image === card.card_faces[0].image ? setImage(card.card_faces[1].image) 
        : setImage(card.card_faces[0].image)
    }

    const displayimage = card.card_faces.length > 1 
            ?
        <img src={image} alt={card.name} onClick={handleClick} />
            :
        <img src={card.card_faces[0].image} alt={card.name} />

    function handleDelete(e){
        console.log(e.target.id)
        fetch(`http://127.0.0.1:5555/mtgcards/${e.target.id}`,{
            method:'DELETE'
        })
        .then((response) => {
            if(response.ok) {
                    setMtgDeck(prevDeck => {
                        prevDeck.cards = prevDeck.cards.filter(card => {return card.id != e.target.id})
                        return prevDeck
                    })
                    setRefresh(e.target.id)
            }
        })
    }
    return (
        <div className=" grid group/card content-center">
            {displayimage}
            <button onClick={handleDelete} id={card.id} className="invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Remove from Deck</button>
        </div>
    )
}