import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

export default function Yugioh(){

    const {yugiDeck, user, setUser, setMtgDeck, setSite, setYugiDeck} = useOutletContext()
    

    const [magicRefresh, setMagicRefresh] = useState(null)
    let deck = "/login"
    user ? deck = "/Yugioh/deck" : deck = "/Login"

    function handleRedirect(){
        user?  null:setSite(null)
    }
    return (
        <div className="bg-[url('/public/_3b21f5ac-ca9b-40fe-ba8e-648577115c32.jpg')] h-screen">
            {/* <h1 className="text-3xl font-bold underline">YuGiOh</h1> */}
            <div className=" grid justify-center">
            <img className=" w-60" src="https://img.yugioh-card.com/en/wp-content/uploads/2020/09/TCG_logo_500x500.png" alt="yugioh logo" />
            <div>
                <Link className=" text-lg border-2 rounded bg-slate-300 hover:bg-slate-500 border-gray-800 font-semibold mx-6" to={"/Yugioh/search"}>Search</Link>
                <Link className=" text-lg border-2 rounded bg-slate-300 hover:bg-slate-500 border-gray-800 font-semibold mx-6" onClick={handleRedirect} to={deck}>Deck</Link>
            </div>
            </div>
            <Outlet context={{yugiDeck, setMagicRefresh, user, setUser, setMtgDeck, setYugiDeck}} />
        </div>
    )
}