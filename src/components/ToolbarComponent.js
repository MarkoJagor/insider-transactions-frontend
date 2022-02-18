import { useContext } from 'react';
import { Toolbar } from 'primereact/toolbar'
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar'
import { Toast } from 'primereact/toast';
import DataContext from '../context/DataContext';
import CSVExportComponent from './CSVExportComponent';
import AccountContext from '../context/AccountContext';

const ToolbarComponent = () => {

    const { toast } = useContext(AccountContext)
    const { issuerDropdownOptions, issuerValue, setIssuerValue, fromDate, setFromDate, toDate, setToDate } = useContext(DataContext)

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
            <CSVExportComponent />
        </div>

    )

    return (
        <>
            <Toast ref={toast} />
            <Toolbar left={toolbarLeftContets} right={toolbarRightContents} style={{ alignItems: 'flex-end' }} />
        </>
    );
};

export default ToolbarComponent;
