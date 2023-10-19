import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function MagicDeckList({deck}){
    const navigate = useNavigate()

    function handleDelete(e){
        console.log(e.target.id)
        fetch(`http://localhost:3000/magic/${e.target.id}`,{
            method:'DELETE'
        })
        navigate(0)
    }
    
    
    return(
    
            <ul className=" inset-x-0 left-0 outline-black outline-8 bg-slate-300">
                {deck ? 
                deck.map(card => 
                    <div className=" flex group/edit ">
                        <li key={card.id} className=" truncate">{card.name}</li>
                        <button id={card.id} className=" invisible group-hover/edit:visible bg-slate-600 hover:bg-slate-800 text-white" onClick={handleDelete}>Remove</button>
                    </div> ):null}
            </ul>
    
    )
}