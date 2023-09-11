// import axios from "axios";
import axios from "./customizeAxios";

const apiGetCourses = (order = 'ASC', page = 1, take = 4, name, start_at, end_at, teachers_id, subjects_id) => {
    return axios.get('/course', {
        params: {
            order,
            page,
            take,
            name,
            start_at,
            end_at,
            teachers_id,
            subjects_id
        }
    });
}

export { apiGetCourses }