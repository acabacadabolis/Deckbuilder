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
    let deck = "/login"
    user ? deck = "/Magic/deck" : deck = "/Login"
    
    return (
        <div className="bg-[url('/public/_de6248e2-0f8b-433b-8cb5-da0e95cb49ac.jpg')] h-screen bg-opacity-0">
            {/* <h1 className="text-3xl font-bold underline">
                Magic: The Gathering
            </h1> */}
            <div className=" grid justify-center">
            <div className=" ">
                <img className=" max-w-sm" src="https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-Logo-1993.png" alt="Magic logo" />
            </div>
            <div>
                <Link className=" text-lg border-2 rounded bg-slate-300 hover:bg-slate-500 border-gray-800 font-semibold mx-6" to={"/Magic/search"}>Search</Link>
                <Link className=" text-lg border-2 rounded bg-slate-300 hover:bg-slate-500 border-gray-800 font-semibold mx-6" to={deck}>Deck</Link>
            </div>
            </div>
            <Outlet context={{user, setMagicRefresh, setYugiDeck, setUser, mtgDeck, setMtgDeck}} />
            
            
        </div>
    )
}