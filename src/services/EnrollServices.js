import axios from './customizeAxios'
// import axios from 'axios';

const apiGetMostEnrolledCourse = () => {
    return axios.get('/enrollment/most-enrolled');
}

const apiEnrollCourse = (id) => {
    return axios.post(`/enrollment/enroll/${id}`)
}

const apiUnenrollCourse = (id) => {
    return axios.delete(`/enrollment/uneroll/${id}`)
}

const apiGetEnrolledCourse = () => {
    return axios.get(`/enrollment/courses`)
}

export { apiGetMostEnrolledCourse, apiEnrollCourse, apiUnenrollCourse, apiGetEnrolledCourse };