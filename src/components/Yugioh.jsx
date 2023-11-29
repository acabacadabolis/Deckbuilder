import React, { useEffect } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

export default function Yugioh(){

    const {yugiDeck, user, setUser, setMtgDeck, setYugiDeck} = useOutletContext()
    
    

    return (
        <div>
            <h1 className="text-3xl font-bold underline">YuGiOh</h1>
            <Link className=" text-lg font-semibold mx-6" to={"/Yugioh/search"}>Search</Link>
            <Link className=" text-lg font-semibold mx-6" to={"/Yugioh/deck"}>Deck</Link>
            <Outlet context={{yugiDeck, user, setUser, setMtgDeck, setYugiDeck}} />
        </div>
    )
}