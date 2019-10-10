import React, { useState } from "react"
import api from "../../services/api"

export default function Login({ history }){
    var [identifier, setIdentifier] = useState('')
    var [password, setPassword] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        if(identifier === "" || password === ""){
            return alert("Preencha todos os campos")
        }
        var res = await api.get("/users", { headers: { identifier: identifier, password: password }})
        if(res.data.error){
            return alert(res.data.error)
        }
        localStorage.setItem("user", res.data._id)
        history.push("/dashboard")
    }
    return(
        <form id="form" onSubmit={handleSubmit}>
            <input placeholder="Insira seu email ou username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
            <br />
            <input placeholder="Insira sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type="submit">Login</button>
            <p>Nenhuma conta?<a href="/register"> Registre-se</a></p>
        </form>
    )
}