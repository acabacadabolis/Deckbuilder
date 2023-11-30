import React, { useEffect, useState } from "react";
import MagicCard from "./MagicCard";
import { Outlet, Link, useOutletContext } from "react-router-dom";

// export async function MagicSearch(   ){
//     let {search} = useParams();
//     console.log(search)
//     // const searchid = await event.formData()
//     // console.log(searchid.get('search'))
//     // const search = await fetch(`https://api.scryfall.com/cards/search?q=${searchid}`)
//     return ({  })
// }

export default function Magic() {
    const {user, setUser, setYugiDeck, mtgDeck, setMtgDeck} = useOutletContext()
    
    const [magicRefresh, setMagicRefresh] = useState(null)
    
    return (
        <div className=" grid justify-center">
            {/* <h1 className="text-3xl font-bold underline">
                Magic: The Gathering
            </h1> */}
            <div className=" ">
                <img className=" max-w-sm" src="https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-logo.png" alt="Magic logo" />
            </div>
            <div>
            <Link className=" text-lg border-2 rounded bg-slate-300 border-gray-800 font-semibold mx-6" to={"/Magic/search"}>Search</Link>
            <Link className=" text-lg border-2 rounded bg-slate-300 border-gray-800 font-semibold mx-6" to={"/Magic/deck"}>Deck</Link>
            </div>
            <Outlet context={{user, setMagicRefresh, setYugiDeck, setUser, mtgDeck, setMtgDeck}} />
            
            
        </div>
    )
}