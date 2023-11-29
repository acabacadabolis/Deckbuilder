import React from "react";
import { NavLink, Link } from "react-router-dom";



export default function Header ({user, setUser}) {

    function handleLogout(event){
        setUser(null)
        fetch("http://127.0.0.1:5555/logout", {
            method:'DELETE'
        })
    }

    return(
        <div className="flex m-auto">
        <div className="flex space-x-4 justify-center">
            <Link to={"/Magic"}>Magic</Link>
            <Link to={"/Yugioh"}>Yugioh</Link>
        </div>
        <div className=" text-right">
            {user === null?<Link to={"/Login"}>Login</Link>:<Link to={"/"} onClick={handleLogout}>Logout</Link>}
        </div>
        </div>
    )
}