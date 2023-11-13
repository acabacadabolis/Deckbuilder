import { redirect, useActionData, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function YugiohCard({name, card_images, site}){

    const [isFocus, setIsFocus] = useState(false)
    const navigate = useNavigate()
    let addedCard

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
            'card_images':card_images,
        }
            
        fetch('http://localhost:3000/yugioh',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(thisCard)
        })
        .then(resp => resp.json)
        .then(data => addedCard=data)
    }

    function handleDelete(){
        fetch(`http://localhost:3000/yugioh/${addedCard.id}`,{
            method:'DELETE'
        })
        navigate(0)
    }

    return (
        <div className=" group/card max-w-xs" 
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}>

            <img className=" max-h-60" src={card_images[0].image_url} alt={name} />
            {site==="search" ? <button onClick={handleAdd} className=" invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Add to Deck</button> 
                    :
                site==="deck"? <button onClick={handleDelete} className="invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Remove from Deck</button>
                    : 
                null}
        </div>
    )
}