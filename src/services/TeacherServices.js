// import axios from "axios";
import axios from "./customizeAxios";

const apiGetTeachers = (order = 'ASC', page = 1, take = 4, full_name, gender, dob) => {
    return axios.get('/teacher', {
        params: {
            order,
            page,
            take,
            full_name,
            gender,
            dob
        }
    });
}

const apiGetAllTeachers = () => {
    return axios.get('/teacher/all-teachers');
}

export { apiGetTeachers, apiGetAllTeachers }