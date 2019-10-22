import React, { useState, useEffect } from "react"
import api from "../../services/api"
import "./styles.css"
import Loading from "../../components/Loading"

export default function Register({ history }){
    var [username, setUsername] = useState('')
    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    var [register, setRegister] = useState(false)

    useEffect(() => {
        async function load(){
            if(localStorage.getItem("user")){
                return history.push("/home")
            }
        }
        load()
    }, [history])
    async function handleSubmit(event){
        event.preventDefault()
        if(!username || username === ""|| !email || email === "" || !password || password === ""){
            return alert("Preencha todos os campos")
        }
        setRegister(true)
        var res = await api.post("/users", { username: username, email: email, password: password })
        if(res.data.error){
            setRegister(false)
            return alert(res.data.error)
        }
        localStorage.setItem("user", res.data._id)
        history.push("/dashboard")
    }
    return(
    <>
    {(register === false) ?
        <form id="form" onSubmit={handleSubmit}>
            <input placeholder="Insira seu username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <input placeholder="Insira seu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input placeholder="Insira sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type="submit">Registrar</button>
            <p>Já tem uma conta?<a href="/login"> Logue-se</a></p>
        </form>
    :
    <Loading />
    }
    </>
    )
}