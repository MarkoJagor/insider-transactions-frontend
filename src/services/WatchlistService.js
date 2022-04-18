import axios from "axios";
import AccountService from "./AccountService";

const WATCHLIST_API_BASE_URL = 'http://localhost:8080/api/v1/watchlist/';

class WatchlistService {

    getActiveIssuers() {
        return axios.get(WATCHLIST_API_BASE_URL + "issuers",
            { headers: AccountService.getAuthHeader() });
    }

    getAccountWatchlist(accountId) {
        return axios.get(WATCHLIST_API_BASE_URL + "account/" + accountId,
            { headers: AccountService.getAuthHeader() })
    }

    updateAccountWatchlist(accountId, watchlist) {
        return axios.put(WATCHLIST_API_BASE_URL + "account/" + accountId, watchlist,
            { headers: AccountService.getAuthHeader() })
    }
}

export default new WatchlistService();