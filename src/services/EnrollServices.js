import axios from './customizeAxios'
// import axios from 'axios';

const apiGetMostEnrolledCourse = () => {
    return axios.get('/enrollment/most-enrolled');
}

export { apiGetMostEnrolledCourse };