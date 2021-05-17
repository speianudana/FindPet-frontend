import axios from "axios";

export default axios.create({
    baseURL: "http://findmypet-back.azurewebsites.net",
    headers: {
        "Content-type": "application/json"
    }

});