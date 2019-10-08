import "dotenv/config"
import axios from "axios"
import ip from "ip"
var api = axios.create({
    baseURL: process.env.REACT_APP_API_URL.replace("<ip>", ip.address())
})

export default api