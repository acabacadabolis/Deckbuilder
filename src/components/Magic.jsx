import React from "react";
import MagicCard from "./MagicCard";
import { Outlet, Link } from "react-router-dom";

// export async function MagicSearch(   ){
//     let {search} = useParams();
//     console.log(search)
//     // const searchid = await event.formData()
//     // console.log(searchid.get('search'))
//     // const search = await fetch(`https://api.scryfall.com/cards/search?q=${searchid}`)
//     return ({  })
// }

export default function Magic() {

    return (
        <div >
            <h1 className="text-3xl font-bold underline">
                Magic: The Gathering
            </h1>
            <Link to={"/Magic/search"}>Search</Link>
            <Link to={"/Magic/deck"}>Deck</Link>
            <Outlet />
            
            
        </div>
    )
}