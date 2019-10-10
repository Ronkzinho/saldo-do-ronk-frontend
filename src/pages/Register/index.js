import React, { useState } from "react"
import api from "../../services/api"
import "./styles.css"

export default function Register({ history }){
    var [username, setUsername] = useState('')
    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        if(!username || username === ""|| !email || email === "" || !password || password === ""){
            return alert("Preencha todos os campos")
        }
        var res = await api.post("/users", { username: username, email: email, password: password })
        if(res.data.error){
            return alert(res.data.error)
        }
        localStorage.setItem("user", res.data._id)
        history.push("/dashboard")
    }
    return(
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
    )
}