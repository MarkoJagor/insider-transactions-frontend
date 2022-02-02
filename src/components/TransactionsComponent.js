import { useContext } from 'react';
import DataContext from '../context/DataContext';
import ToolbarComponent from './ToolbarComponent';
import TransactionsTableComponent from './TransactionsTableComponent';
import '../styles/layout.css'
import DataNotFoundComponent from './DataNotFoundComponent';

const TransactionsComponent = () => {
    const { fetchError, isLoading } = useContext(DataContext)

    return (
        <main style={{ width: '100%', position: 'relative' }}  >

            {isLoading &&
                <div className='loadingScreen'>
                    <i className='pi pi-spin pi-spinner icon'></i>
                    <p>Laen andmeid...</p>
                </div>
            }

            {
                fetchError && <DataNotFoundComponent />
            }

            {
                !fetchError && !isLoading &&
                <>
                    <ToolbarComponent />
                    <TransactionsTableComponent />
                </>
            }
        </main>
    );
};

export default TransactionsComponent;
