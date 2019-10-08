import React, { useState, useEffect } from "react"
import api from "../../services/api"

export default function Dashboard(){
    var [userSaldo, setUserSaldo] = useState('')
    var [saldo, setSaldo] = useState('')
    useEffect(() => {
        async function load(){
            var res = await api.get("/dashboard", { headers: { _id: localStorage.getItem("user") }})
            setUserSaldo(res.data.saldo)
        }
        load()
    }, [])
    async function validate(event){
        event.preventDefault()
        if(saldo === "" || isNaN(parseInt(saldo.replace(",", ".")))){
            return alert("Preencha os campos corretamente")
        }
        var res = await api.put("/dashboard", { _id: localStorage.getItem("user"), saldo: saldo})
        setUserSaldo(res.data.saldo)
    }
    async function resetar(){
        var res = await api.delete("/dashboard", { headers: { _id: localStorage.getItem("user") }})
        if(res.data.error){
            return alert(res.data.error)
        }
        setUserSaldo(res.data.saldo)
    }
    return(
        <form onSubmit={validate}>
                <h1 id="h2">Seu saldo:</h1>
                <h2 id="saldo">{parseFloat(userSaldo).toFixed(2).replace(".", ",")}</h2>
                <h3>Quanto?</h3>
                <input type="number" placeholder="Coloque o valor aqui" value={saldo} onChange={(e) => setSaldo(e.target.value)}></input>
                <h4>Pronto, agora para terminar, é so clicar em ir</h4>
                <button id="butao" type="submit">Ir</button>
                <button onClick={resetar}>Resetar</button>
        </form>
    )
} 