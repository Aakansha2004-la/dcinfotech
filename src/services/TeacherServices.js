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

export { apiGetTeachers }