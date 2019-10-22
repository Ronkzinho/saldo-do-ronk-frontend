import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import "./styles.css"
import Loading from "../../components/Loading"
export default function History({ history }){
    var [userHistory, setUserHistory] = useState([])
    var [loaded, setLoaded] = useState(false)
    useEffect(() => {
        async function load(){
            var user = localStorage.getItem("user")
            if(!user){
                return history.push("/home")
            }
            var res = await api.get("/dashboard", { headers: { _id: user }})
            setLoaded(true)
            setUserHistory(res.data.history)
        }
        load()
    }, [history])
    async function deletar(histID){
        var res = await api.delete("/history", { headers: { user_id: localStorage.getItem("user"), history_id: histID }})
        if(res.data.error){
            return alert(res.data.error)
        }
        setUserHistory(res.data.history)
    }
    return(
        <>
        {(loaded === true) ? 
        <>
            <Link to="/dashboard"><button>Voltar</button></Link>
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
        : <Loading />
        }
        </>
    )
}