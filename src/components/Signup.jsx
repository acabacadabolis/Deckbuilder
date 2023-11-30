import { useState } from "react"
import {useNavigate, useOutletContext} from "react-router-dom"

export default function Signup(){
    const blankForm = {
        "username": "",
        "password": "",
        "name": "",
        "email": ""
    }
    

    const navigate = useNavigate()
    const [formData, setFormData] = useState(blankForm)
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData, 
                [event.target.name]: event.target.value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault()
        fetch("http://127.0.0.1:5555/signup", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then((response) => {
            if(response.ok) {
                response.json().then((data) => {
                    setFormData(blankForm)
                    navigate("/login")
                })
            }
        })
        
        
    }

    return (
        <div className=" py-12">
            <h1 className=" font-semibold text-2xl">SIGNUP</h1>
            <div className=" py-6 border-gray-950 grid justify-center">
            <form className=" shadow grid   justify-start text-left"onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input  name="username" onChange={handleChange} autoComplete="off" type="text" placeholder="Username"></input>
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input name="password"  onChange={handleChange} autoComplete="off" type="password" placeholder="Password"></input>
                </div>
                <div>
                <label htmlFor="name">Name:</label>
                <input name="name"  onChange={handleChange} autoComplete="off" type="text" placeholder="Name"></input>
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input name="email"  onChange={handleChange} autoComplete="off" type="email" placeholder="Example@example.com"></input>
                </div>
                <button className=" border-2 border-blue-400 hover:bg-blue-300" type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}