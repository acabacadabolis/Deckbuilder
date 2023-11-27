import { useState } from "react"
import {useNavigate} from "react-router-dom"

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
        console.log(formData)
        fetch("http://127.0.0.1:5555/signup", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then(resp => resp.json)
        // .then(data => console.log(data))
        
        setFormData(blankForm)
        navigate("/login")
    }

    return (
        <div>
            <h1>SIGNUP</h1>
            <form className=" grid justify-start text-left"onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input name="username" onChange={handleChange} autoComplete="off" type="text" placeholder="Username"></input>
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input name="password" onChange={handleChange} autoComplete="off" type="text" placeholder="Password"></input>
                </div>
                <div>
                <label htmlFor="name">Name:</label>
                <input name="name" onChange={handleChange} autoComplete="off" type="text" placeholder="Name"></input>
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input name="email" onChange={handleChange} autoComplete="off" type="text" placeholder="Email"></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}