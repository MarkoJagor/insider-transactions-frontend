import axios from "axios";

const TRANSACTIONS_API_BASE_URL = 'http://localhost:8080/api/v1/transactions';

class TransactionService {

    getTransactions() {
        return axios.get(TRANSACTIONS_API_BASE_URL);
    }

    getTransactionById(transactionId) {
        return axios.get(TRANSACTIONS_API_BASE_URL + '/' + transactionId)
    }
}

export default new TransactionService();