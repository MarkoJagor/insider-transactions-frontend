import axios from "axios";

const ACCOUNTS_API_BASE_URL = 'http://localhost:8080/api/v1/account';

class AccountService {

    signup(account) {
        return axios.post(ACCOUNTS_API_BASE_URL + "/signup", account);
    }

    signin(account) {
        return axios.post(ACCOUNTS_API_BASE_URL + "/signin", account);
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        console.log("Current user requested")
        return JSON.parse(localStorage.getItem("user"));
    }

    // used for passing jwt token as header during authorized requests
    getAuthHeader() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }
}

export default new AccountService();