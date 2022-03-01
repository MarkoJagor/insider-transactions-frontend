import { useContext } from 'react';
import DataContext from '../context/DataContext';
import ToolbarComponent from './ToolbarComponent';
import TransactionsTableComponent from './TransactionsTableComponent';
import DataNotFoundComponent from './DataNotFoundComponent';
import Loading from './Loading';

const TransactionsComponent = () => {
    const { fetchError, isLoading } = useContext(DataContext)

    return (
        <main style={{ width: '100%', position: 'relative' }}  >

            {
                isLoading && <Loading />
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
