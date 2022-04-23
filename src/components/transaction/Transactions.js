import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import Toolbar from './Toolbar';
import TransactionsTable from './TransactionsTable';
import DataNotFound from '../util/DataNotFound';
import Loading from '../util/Loading';

const Transactions = () => {
    const { fetchError, isLoading } = useContext(DataContext)

    return (
        <main style={{ width: '100%', position: 'relative' }}  >

            {
                isLoading && <Loading />
            }

            {
                fetchError && <DataNotFound />
            }

            {
                !fetchError && !isLoading &&
                <>
                    <Toolbar />
                    <TransactionsTable />
                </>
            }
        </main>
    );
};

export default Transactions;
