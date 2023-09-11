// import axios from "axios";
import axios from "./customizeAxios";

const apiGetClasses = (order = 'ASC', page = 1, take = 4, name, student_number) => {
    return axios.get('/class', {
        params: {
            order,
            page,
            take,
            name,
            student_number
        }
    });
}

export { apiGetClasses }