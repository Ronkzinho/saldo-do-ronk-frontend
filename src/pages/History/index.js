import React, { useEffect, useState } from "react"
import api from "../../services/api"
import "./styles.css"
export default function History({ history }){
    var [userHistory, setUserHistory] = useState([])
    useEffect(() => {
        async function load(){
            var user = localStorage.getItem("user")
            var res = await api.get("/dashboard", { headers: { _id: user }})
            setUserHistory(res.data.history)
        }
        load()
    }, [])
    async function deletar(histID){
        var res = await api.delete("/history", { headers: { user_id: localStorage.getItem("user"), history_id: histID }})
        if(res.data.error){
            return alert(res.data.error)
        }
        setUserHistory(res.data.history)
    }
    return(
        <>
            <h1>Seu histórico</h1>
            <ul>
            {(userHistory.length > 0) ? userHistory.map(hist => (
            <li key={hist._id}>
                <h2>Quantia: {hist.quantia}</h2>
                <h2>Descrição: {hist.descrição}</h2>
                <h2>Data: {hist.data}</h2>
                <button onClick={() => deletar(hist._id)}>Deletar do histórico</button>
            </li>
            )) : <h2>Nenhum historico</h2>}
            </ul>
        </>
    )
}