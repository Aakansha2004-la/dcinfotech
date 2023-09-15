// import axios from "axios";
import axios from "./customizeAxios";

const apiUpdateStudent = ({ id, studentChange }) => {
    return axios.put(`/student/update/${id}`, { ...studentChange })
}

export { apiUpdateStudent }