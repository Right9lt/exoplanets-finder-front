import axios from "axios";

const httpClient = axios.create({
    baseURL:'https://mychaelbyte.dev.env.ngrok.app'

})

export default httpClient;