import './App.css';
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import SideNav from './components/util/SideNav';
import TransactionsComponent from './components/transaction/Transactions';
import TransactionDetailsComponent from './components/transaction/TransactionDetails';
import PageNotFound from './components/util/PageNotFound';
import RegistrationForm from './components/account/RegistrationForm';
import LoginForm from './components/account/LoginForm';
import WatchlistComponent from './components/watchlist/Watchlist';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <SideNav />
        <Routes>
          <Route path='/' element={<TransactionsComponent />} />
          <Route path='/transaction/:transactionId' element={<TransactionDetailsComponent />} />
          <Route path='/watchlist' element={<WatchlistComponent />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
