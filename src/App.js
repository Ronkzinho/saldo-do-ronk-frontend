import React from 'react';
import Routes from "./routes"
import moon from "./assets/moon.png"
import sun from "./assets/sun.png"
import "./App.css"

function App() {
  var [theme, setTheme] = React.useState("")
  React.useEffect(() => {
    if(localStorage.getItem("theme") === "dark"){
      document.body.classList.replace("light", "dark")
      setTheme("dark")
    }
    else{
      setTheme("light")
    }
  }, [theme])
  function changeTheme(){
      if(localStorage.getItem("theme") === "dark"){
        document.body.classList.replace("dark", "light")
        localStorage.setItem("theme", "light")
        setTheme("light")
      }
      else{
        document.body.classList.replace("light", "dark")
        localStorage.setItem("theme", "dark")
        setTheme("dark")
      }
  } 
  return (
    <div id="container" className="container">
      <input className="theme-icon" type="image" alt="theme" onClick={() => { changeTheme() }} style={{ position: "absolute", right: "0", top: 1 }} width={36} height={36} src={(theme === "light") ? moon : sun }/>
      <Routes />
    </div>
  );
}

export default App;
