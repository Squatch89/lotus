import axios from 'axios';

export default {
    isAuthenticated() {
        return JSON.parse(localStorage.getItem('isAuthenticated'));
    }
}