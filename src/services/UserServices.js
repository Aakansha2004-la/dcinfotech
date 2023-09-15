import axios from './customizeAxios'

const apiGetUserProfile = (id) => {
    return axios.get(`/users/user-profile/${id}`);
}

export { apiGetUserProfile }