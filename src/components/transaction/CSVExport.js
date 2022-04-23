import { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import DataContext from '../../context/DataContext';
import { Button } from 'primereact/button'

const CSVExport = () => {

    const { tableData } = useContext(DataContext);
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        const modifiedTableData = tableData.map((transaction) => transaction.hasBeenUpdated === false ?
            { ...transaction, hasBeenUpdated: 'Algne teade' } :
            { ...transaction, hasBeenUpdated: 'Muudatus' }
        );
        setCsvData(modifiedTableData)

    }, [tableData])

    const csvHeaders = [
        { label: "Tehingu kuupäev", key: "tradeDate" },
        { label: "Avalikustamise kuupäev", key: "publishedDate" },
        { label: "Emitent", key: "issuer" },
        { label: "Investor", key: "investor" },
        { label: "Positsioon", key: "investorPosition" },
        { label: "Kogus", key: "volume" },
        { label: "Hind", key: "price" },
        { label: "Finantsinstrument", key: "instrument" },
        { label: "Tehingu liik", key: "transactionType" },
        { label: "Tehingu koht", key: "market" },
        { label: "Algne teade / muudatus", key: "hasBeenUpdated" },
        { label: "Muudatuse põhjus", key: "updateReason" }
    ]

    return (
        <CSVLink data={csvData} headers={csvHeaders} filename='transactions.csv' style={{ textDecoration: 'none' }}>
            <Button label='CSV' className='p-button-success p-button-raised' icon='pi pi-file' />
        </CSVLink>
    );
};

export default CSVExport;
