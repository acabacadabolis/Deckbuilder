import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function MagicDeckList({deck, setMtgDeck, setRefresh, setYugiDeck, yugiDeck, site}){

    function handleMtgDelete(e){
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
    
    function handleYgoDelete(e){
        console.log(e.target.id)
        fetch(`http://127.0.0.1:5555/ygocards/${e.target.id}`,{
            method:'DELETE'
        })
        .then((response) => {
            if(response.ok) {
                    setYugiDeck(prevDeck => {
                        prevDeck.yugi_cards = prevDeck.yugi_cards.filter(card => {return card.id != e.target.id})
                        return prevDeck
                    })
                    setRefresh(e.target.id)
            }
        })
    }
    
    return(
        <div>
            {site == "magic"
                ?
                <ul className=" inset-x-0 h-96 w-48 left-0 bg-slate-300">
                    {deck ? 
                    deck.map(card => 
                        <div className=" flex group/edit ">
                            <li key={card.card.name} className=" truncate">{card.card.name}</li>
                            <button id={card.card.id} name={card.card.name} className=" invisible group-hover/edit:visible bg-slate-600 hover:bg-slate-800 text-white" onClick={handleMtgDelete}>Remove</button>
                        </div> ):null}
                </ul>
                : 
                <ul className=" inset-x-0 h-96 w-48 left-0 bg-slate-300">
                    {deck ? 
                    deck.map(card => 
                        <div className=" flex group/edit ">
                            <li key={card.yugi_card.name} className=" truncate">{card.yugi_card.name}</li>
                            <button id={card.id} name={card.name} className=" invisible group-hover/edit:visible bg-slate-600 hover:bg-slate-800 text-white" onClick={handleYgoDelete}>Remove</button>
                        </div> ):null}
                </ul>
            }
        </div>
    )
}