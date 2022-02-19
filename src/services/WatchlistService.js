import axios from "axios";
import AccountService from "./AccountService";

const WATCHLIST_API_BASE_URL = 'http://localhost:8080/api/v1/watchlist/';

class WatchlistService {

    getActiveIssuers() {
        return axios.get(WATCHLIST_API_BASE_URL + "issuers",
            { headers: AccountService.getAuthHeader() });
    }

    getAccountIssuers(accountId) {
        return axios.get(WATCHLIST_API_BASE_URL + 'account/' + accountId,
            { headers: AccountService.getAuthHeader() })
    }

    updateAccountIssuers(issuersList, accountId) {
        return axios.put(issuersList, WATCHLIST_API_BASE_URL + 'account/' + accountId,
            { headers: AccountService.getAuthHeader() })
    }
}

export default new WatchlistService();