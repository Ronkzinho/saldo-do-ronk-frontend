import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

export default function Routes(){
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/dashboard" component={ Dashboard } /> 
        </Switch>
    </BrowserRouter>
    )
}