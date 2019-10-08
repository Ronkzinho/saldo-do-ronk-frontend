import React, { useEffect } from "react"

export default function Home({ history }){
    useEffect(() => {
        if(localStorage.getItem("user")){
            history.push("/dashboard")
        }   
    })
    return(
        <>
            <h1>Olá, seja bem vindo ao Saldo do Ronk</h1>
            <a href="/login"><button>Logar-se</button></a>
            <a href="/register"><button>Registrar-se</button></a>
        </>
    )
}