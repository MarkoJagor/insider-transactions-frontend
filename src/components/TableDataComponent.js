import { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar'
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { format } from 'date-fns';
import DataContext from '../context/DataContext';


const TableDataComponent = () => {
    const { transactions, issuerDropdownOptions } = useContext(DataContext)

    const [tableData, setTableData] = useState([]);
    const [issuerValue, setIssuerValue] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState(new Date())
    const [keywordValue, setKeywordValue] = useState('')


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

    }, [transactions, issuerValue, fromDate, toDate, keywordValue]);

    const sliceColumnBody = (rowData, field) => {
        const fieldValue = field.field
        return rowData[fieldValue].length <= 20 ? rowData[fieldValue] : `${(rowData[fieldValue]).slice(0, 20)}...`
    }

    const toolbarLeftContets = (
        <div>
            <div>
                <label htmlFor='dropdown' style={{ paddingRight: '82px' }}>Emitent</label>
                <Dropdown id='dropdown'
                    placeholder='Vali üks'
                    optionLabel='name'
                    optionValue='name'
                    options={issuerDropdownOptions}
                    value={issuerValue}
                    onChange={(e) => e.target.value === undefined ? setIssuerValue('') : setIssuerValue(e.target.value)}
                    showClear
                    filter
                    filterBy='name' />
            </div>
            <div style={{ paddingTop: '10px' }}>
                <label htmlFor="calendarFrom" style={{ paddingRight: '10px' }}>Tehingu kuupäev</label>
                <Calendar
                    id='calendarFrom'
                    placeholder='Alates'
                    value={fromDate}
                    onChange={(e) => e.target.value === null ? setFromDate('') : setFromDate(e.target.value)}
                    dateFormat='yy-mm-dd'
                    showButtonBar
                    showIcon
                    monthNavigator
                    yearNavigator
                    yearRange='2000:2030' />
                <label htmlFor="calendarFrom" style={{ paddingRight: '10px', paddingLeft: '10px' }}>-</label>
                <Calendar
                    id='calendarFrom'
                    placeholder='Kuni'
                    value={toDate}
                    onChange={(e) => e.target.value === null ? setToDate(new Date()) : setToDate(e.target.value)}
                    dateFormat='yy-mm-dd'
                    showButtonBar
                    minDate={fromDate}
                    showIcon
                    monthNavigator
                    yearNavigator
                    yearRange='2000:2030' />
            </div>
        </div >
    )

    const toolbarRightContents = (
        <div>
            <Button label='CSV' className='p-button-success p-button-raised' icon='pi pi-file' />
        </div>

    )

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
        <div style={{ width: '100%' }}>
            <div >
                <Toolbar left={toolbarLeftContets} right={toolbarRightContents} style={{ alignItems: 'flex-end' }} />
            </div>
            <DataTable
                value={tableData}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50, 100]}
                size='small'
                stripedRows
                scrollable
                scrollHeight='flex'
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
            </DataTable>
        </div>
    );
};

export default TableDataComponent;
