import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

export default function Yugioh(){

    const {yugiDeck, user, setUser, setMtgDeck, setYugiDeck} = useOutletContext()
    

    const [magicRefresh, setMagicRefresh] = useState(null)

    return (
        <div className=" flex justify-center">
            {/* <h1 className="text-3xl font-bold underline">YuGiOh</h1> */}
            <img className=" max-w-sm" src="https://img.yugioh-card.com/en/wp-content/uploads/2020/09/TCG_logo_500x500.png" alt="yugioh logo" />
            <Link className=" text-lg font-semibold mx-6" to={"/Yugioh/search"}>Search</Link>
            <Link className=" text-lg font-semibold mx-6" to={"/Yugioh/deck"}>Deck</Link>
            <Outlet context={{yugiDeck, setMagicRefresh, user, setUser, setMtgDeck, setYugiDeck}} />
        </div>
    )
}