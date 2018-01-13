import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export {getUserHome, getUserTrends};

function getUserHome() {
    const url = `${BASE_URL}/api/user`;
    return axios.get(url).then(response => response.data);
}

function getUserTrends() {
    const url = `${BASE_URL}/api/user/trends`;
    return axios.get(url).then(response => response.data);
}