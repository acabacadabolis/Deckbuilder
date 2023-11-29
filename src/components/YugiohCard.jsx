import { redirect, useActionData, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function YugiohCard({name, card_images, deckid, setYugiDeck}){

    const [isFocus, setIsFocus] = useState(false)

    function handleFocus () {
        setIsFocus(prev => !prev)
    }
    
    function handleBlur () {
        setIsFocus(prev => !prev)
    }

    function handleAdd(){
        let thisCard = {}
        
        thisCard = {
                'name':name,
                'image':card_images[0].image_url_small,
                'deck_id':deckid,
        }

        fetch('http://127.0.0.1:5555/ygocards',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(thisCard)
        })
        .then((resp) => {
            if(resp.ok){
                resp.json().then((data) => {
                    setYugiDeck(prevDeck => {
                        prevDeck.yugi_cards.push(data)
                        return prevDeck
                    })
                })
            }
        })
    }
    

    // <button onClick={handleDelete} className="invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Remove from Deck</button>
    function handleDelete(){
        fetch(`http://localhost:3000/yugioh/${addedCard.id}`,{
            method:'DELETE'
        })
        
    }

    return (
        <div className=" group/card max-w-xs" 
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}>

            <img className=" max-h-60" src={card_images[0].image_url} alt={name} />
            <button onClick={handleAdd} className=" invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Add to Deck</button> 
        </div>
    )
}