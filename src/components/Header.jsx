import React from "react";
import { NavLink, Link } from "react-router-dom";



export default function Header () {


    return(
        <div className="flex m-auto">
        <div className="flex space-x-4 justify-center">
            <Link to={"/Magic"}>Magic</Link>
            <Link to={"/Pokemon"}>Pokemon</Link>
            <Link to={"/Yugioh"}>Yugioh</Link>
        </div>
        <div className=" text-right">
            <Link to={"/Login"}>Login</Link>
        </div>
        </div>
    )
}