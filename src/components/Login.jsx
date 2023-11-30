import { useState } from "react"
import { Outlet, Link, useNavigate, Form, useLoaderData, useActionData, useLocation, useOutletContext } from "react-router-dom";


export default function Login() {
    const blankForm = {
        "username": "",
        "password": "",
    }

    const {setMtgDeck, setUser, setSite, setYugiDeck} = useOutletContext()
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
                    setSite(null)
                })
            setLoginForm(blankForm)
            navigate("/")
            }
        })
        
    
    }
    function handleClick(event){
        navigate('/Signup')
    }

    return(
        <div className=" py-12">
            <h1 className=" font-semibold text-2xl">LOGIN</h1>
            <div className=" py-6 border-gray-950 grid shrink justify-center">
            <Form method='post' state={{state:"monkey"}}  className=" shadow grid justify-start text-left"onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input name="username" onChange={handleChange} autoComplete="off" type="text" placeholder="Username"></input>
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input name="password" onChange={handleChange} autoComplete="off" type="password" placeholder="Password"></input>
                </div>
                <button className=" border-2 border-blue-400 hover:bg-blue-300" type="submit">Submit</button>
            </Form>
            <button className=" border-2 border-blue-400 hover:bg-blue-300" onClick={handleClick}>New User</button>
            </div>
        </div>
    )
  
}
