import { useState } from "react"
import { Outlet, Link, useNavigate, Form, useLoaderData, useActionData, useLocation, useOutletContext } from "react-router-dom";


export default function Login() {
    const blankForm = {
        "username": "",
        "password": "",
    }

    const {setMtgDeck, setUser, setYugiDeck} = useOutletContext()
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState(blankForm)
    
    function handleChange(event) {
        setLoginForm(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault()

        fetch("http://127.0.0.1:5555/login", {
            method:'POST',
            credentials: "include",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginForm)
        })
        .then((response) => {
            if(response.ok) {
                response.json().then((data) => {
                    setUser(data)
                    setMtgDeck(data.mtgdecks[0])
                    setYugiDeck(data.yugidecks[0])
                })
            }
        })
        setLoginForm(blankForm)
        navigate("/")
    
    }
    function handleClick(event){
        navigate('/Signup')
    }

    return(
        <div>
            <h1>LOGIN</h1>
            <Form method='post' state={{state:"monkey"}}  className=" grid justify-start text-left"onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input name="username" onChange={handleChange} autoComplete="off" type="text" placeholder="Username"></input>
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input name="password" onChange={handleChange} autoComplete="off" type="password" placeholder="Password"></input>
                </div>
                <button type="submit">Submit</button>
            </Form>
            <button onClick={handleClick}>New User</button>
        </div>
    )
  
}
