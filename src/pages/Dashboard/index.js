import React, { useState, useEffect } from "react"
import moment from 'moment/min/moment-with-locales'
import Loading from "../../components/Loading"
import api from "../../services/api"
import "./styles.css"
moment.locale("pt-br")

export default function Dashboard({ history }){
    var [userSaldo, setUserSaldo] = useState('')
    var [saldo, setSaldo] = useState('')
    var [loaded, setLoaded] = useState(false)
    useEffect(() => {
        async function load(){
            if(!localStorage.getItem("user")){
                return history.push("/home")
            }
            var res = await api.get("/dashboard", { headers: { _id: localStorage.getItem("user") }})
            setLoaded(true)
            setUserSaldo(res.data.saldo)
        }
        load()
    }, [history])
    
    async function validate(event){
        event.preventDefault()
        if(saldo === "" || isNaN(parseInt(saldo.replace(",", ".")))){
            return alert("Preencha os campos corretamente")
        }
        var history = prompt("Descrição")
        if(history === null){
            return
        }
        if(history === ""){
            history = "Nenhuma descrição"
        }
        var res = await api.put("/dashboard", { _id: localStorage.getItem("user"), saldo: saldo, history: history, moment: moment().format('L') + " ás " +  moment().format('LTS')})
        setUserSaldo(res.data.saldo)
    }
    async function resetar(){
        if(!window.confirm("Você tem certeza que deseja resetar seu saldo?")){
            return
        }
        var res = await api.delete("/dashboard", { headers: { _id: localStorage.getItem("user") }})
        if(res.data.error){
            return alert(res.data.error)
        }
        setUserSaldo(res.data.saldo)
    }
    async function logout(){
        localStorage.removeItem("user")
        history.push("/")
    }
    return(
        <>
        {(loaded === true) ?
<> 
        <button onClick={() => logout()}>Logout</button>
        <form onSubmit={validate}>
                <h1 id="h2">Seu saldo:</h1>
                <h2 id="saldo">R${parseFloat(userSaldo).toFixed(2).replace(".", ",")}</h2>
                <h3>Deseja alterar o seu saldo?</h3>
                <input type="number" placeholder="Coloque o valor aqui" value={saldo} onChange={(e) => setSaldo(e.target.value)}></input>
                <br/>
                <br />
                <button id="butao" type="submit">Ir</button>
                <button onClick={resetar}>Resetar</button>
                <button onClick={() => history.push("/history")}>Ir para o histórico</button>
        </form>
</>
        : <Loading />}
        </>
    )
} 