import axios from './customizeAxios'

const apiGetMostEnrolledCourse = () => {
    return axios.get('/enrollment/most-enrolled');
}

export { apiGetMostEnrolledCourse };