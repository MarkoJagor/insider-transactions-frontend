import { createContext, useState, useEffect } from "react";
import TransactionService from "../services/TransactionService";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    //data variables
    const [transactions, setTransactions] = useState([]);
    const [tableData, setTableData] = useState([]);
    //filtering variables
    const [issuerDropdownOptions, setIssuerDropdownOptions] = useState([]);
    const [keywordValue, setKeywordValue] = useState('')
    const [issuerValue, setIssuerValue] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState(new Date());
    //data loading and error handling
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const response = await TransactionService.getTransactions();
                setTransactions(response.data);
                getUniqueIssuers(response.data);
                setFetchError(null);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log(`Error: ${error.message}`);
                }
                console.log(error.config);
                setFetchError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadTransactions()
    }, []);

    const getUniqueIssuers = (response) => {
        const issuers = response.map((transaction) => transaction.issuer)
        const uniqueIssuers = [...new Set(issuers)].sort()
        const uniquerIssuersAsObjects = uniqueIssuers.map((transaction) => ({ name: transaction }))
        setIssuerDropdownOptions(uniquerIssuersAsObjects)
    }

    return (
        <DataContext.Provider value={{
            transactions,
            issuerDropdownOptions,
            keywordValue,
            setKeywordValue,
            tableData,
            setTableData,
            issuerValue,
            setIssuerValue,
            fromDate,
            setFromDate,
            toDate,
            setToDate,
            fetchError,
            isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;