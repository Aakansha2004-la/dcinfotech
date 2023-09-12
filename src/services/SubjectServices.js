// import axios from "axios";
import axios from "./customizeAxios";

const apiGetSubjects = (order = 'ASC', page = 1, take = 4, name, credit) => {
    return axios.get('/subject', {
        params: {
            order,
            page,
            take,
            name,
            credit
        }
    });
}

const apiGetAllSubjects = () => {
    return axios.get('/subject/all-subjects');
}

export { apiGetSubjects, apiGetAllSubjects }