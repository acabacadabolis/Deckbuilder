import React from "react";
import { NavLink, Link } from "react-router-dom";



export default function Header ({user, setUser, setMtgDeck,setSite, setYugiDeck}) {

    function handleLogout(event){
        setUser(null)
        setMtgDeck(null)
        setYugiDeck(null)
        fetch("http://127.0.0.1:5555/logout", {
            method:'DELETE'
        })

    }

    function settoyugi(){
        setSite('yugi')
    }

    function settomagic(){
        setSite('magic')
    }

    return(
        <div className=" font-semibold flex justify-between ">
        <div className="flex space-x-4 justify-center">
            <Link onClick={settomagic} to={"/Magic"}>Magic</Link>
            <Link onClick={settoyugi} to={"/Yugioh"}>Yugioh</Link>
        </div>
        <div className="">
            {user === null?<Link to={"/Login"}>Login</Link>:<Link to={"/"} onClick={handleLogout}>Logout</Link>}
        </div>
        </div>
    )
}