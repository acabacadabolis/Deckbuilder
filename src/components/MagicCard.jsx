import React, { useEffect, useState } from "react";
import { redirect, useActionData, useNavigate } from "react-router-dom";

export async function DeleteCard(id){
    fetch(`http://localhost:3000/magic/${id}`,{
            method:'DELETE'
        })
}

export default function MagicCard ({ mtgDeck, setMtgDeck, id ,name, image_uris, card_faces}) {

    const [isFaces, setIsFaces] = useState(card_faces)
    const [isFocus, setIsFocus] = useState(false)
    const navigate = useNavigate()
    useEffect(() =>{
        image_uris ? "" : setIsFaces(card_faces[0].image_uris.small)

    },[])

    function handleClick(){
        isFaces === card_faces[0].image_uris.small ? setIsFaces(card_faces[1].image_uris.small) 
        : setIsFaces(card_faces[0].image_uris.small)
    }

    function handleAdd(){
        let thisCard = {}
        image_uris ?
            thisCard = {
                'name':name,
                'image_uris':image_uris,
                'deck_id':mtgDeck.id,
            }
            :
            thisCard = {
                'name':name,
                'card_faces':card_faces.length,
                'image_uris':card_faces,
                'deck_id':mtgDeck.id,
            }
        fetch('http://127.0.0.1:5555/mtgcards',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(thisCard)
        })
        .then((resp) => {
            if(resp.ok){
                resp.json().then((data) => {
                    setMtgDeck(prevDeck => {
                        prevDeck.cards.push(data)
                        return prevDeck
                    })
                })
            }
        })
    }

    const displayCard = image_uris ?
    (<img 
        src={image_uris.small} 
        alt={name} 
        className=" justify-center" /> 
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
        <div className=" grid group/card content-center"
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur} >
            {displayCard}
            <button onClick={handleAdd} className=" invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Add to Deck</button>
        </div>
    )
}