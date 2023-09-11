// import axios from "axios";
import axios from "./customizeAxios";

const apiLogin = (username, password) => {
    return axios.post('/auth/login', { username, password });
}

export { apiLogin }