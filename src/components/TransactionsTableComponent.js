import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import '../styles/table.css'
import { format } from 'date-fns';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const TransactionsTableComponent = () => {

    const { transactions, tableData, setTableData, issuerValue, fromDate, toDate, keywordValue, setKeywordValue } = useContext(DataContext)

    useEffect(() => {

        const filterTransactions = () => {

            const filteredTransactions = transactions.filter((transaction) =>
                ((transaction.issuer).toLowerCase()).includes(issuerValue.toLowerCase()) &&
                Date.parse(transaction.tradeDate) >= fromDate &&
                Date.parse(transaction.tradeDate) <= Date.parse(format(new Date(toDate), 'yyyy-MM-dd')) &&
                (
                    ((transaction.issuer).toLowerCase()).includes(keywordValue.toLowerCase()) ||
                    ((transaction.investor).toLowerCase()).includes(keywordValue.toLowerCase()) ||
                    ((transaction.instrument).toLowerCase()).includes(keywordValue.toLowerCase()) ||
                    ((transaction.transactionType).toLowerCase()).includes(keywordValue.toLowerCase()) ||
                    ((transaction.market).toLowerCase()).includes(keywordValue.toLowerCase()) ||
                    ((transaction.volume).toString()).includes(keywordValue) ||
                    ((transaction.price).toString()).includes(keywordValue) ||
                    (transaction.tradeDate).includes(keywordValue) ||
                    (transaction.publishedDate).includes(keywordValue)
                )
            )

            setTableData(filteredTransactions)
        }

        filterTransactions()

    }, [transactions, issuerValue, fromDate, toDate, keywordValue, setTableData]);

    const sliceColumnBody = (rowData, field) => {
        const fieldValue = field.field
        return rowData[fieldValue].length <= 20 ? rowData[fieldValue] : `${(rowData[fieldValue]).slice(0, 20)}...`
    }

    const tableHeader = (
        <div>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    placeholder="Otsing märksõna järgi"
                    onChange={(e) => setKeywordValue(e.target.value)} />
            </span>
        </div>

    )

    return (
        <>
            <DataTable
                value={tableData}
                paginator
                rows={25}
                rowsPerPageOptions={[10, 25, 50, 100]}
                size='small'
                stripedRows
                header={tableHeader}
            >

                <Column field='tradeDate' header='Tehingu kuupäev' sortable></Column>
                <Column field='publishedDate' header='Avalikustamise kuupäev' sortable></Column>
                <Column field='issuer' header='Emitent' body={(rowData, field) => sliceColumnBody(rowData, field)}></Column>
                <Column field='investor' header='Investor' body={(rowData, field) => sliceColumnBody(rowData, field)}></Column>
                <Column field='volume' header='Kogus'></Column>
                <Column field='price' header='Hind'></Column>
                <Column field='instrument' header='Finantsinstrument' body={(rowData, field) => sliceColumnBody(rowData, field)}></Column>
                <Column field='transactionType' header='Tehingu liik' body={(rowData, field) => sliceColumnBody(rowData, field)}></Column>
                <Column field='market' header='Tehingu koht' body={(rowData, field) => sliceColumnBody(rowData, field)}></Column>
                <Column field='transactionId' style={{ flex: '0 0 5rem' }} body={(rowData) =>
                    <Link to={`/transaction/${rowData.transactionId}`} target='_blank' style={{ textDecoration: 'none' }}>
                        <Button icon='pi pi-info' className='p-button-info p-button-rounded' />
                    </Link>
                }>
                </Column >
            </DataTable >
        </>
    );
};

export default TransactionsTableComponent;
