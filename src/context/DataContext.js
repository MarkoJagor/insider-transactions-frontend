import { createContext, useState, useEffect } from "react";
import TransactionService from "../services/TransactionService";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    //data variable
    const [transactions, setTransactions] = useState([]);
    const [tableData, setTableData] = useState([]);
    //filtering variables
    const [issuerDropdownOptions, setIssuerDropdownOptions] = useState([]);
    const [keywordValue, setKeywordValue] = useState('')
    const [issuerValue, setIssuerValue] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState(new Date());

    useEffect(() => {
        const loadTransactions = async () => {
            const response = await TransactionService.getTransactions()
            setTransactions(response.data)
            getUniqueIssuers(response.data)
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
            setToDate
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;