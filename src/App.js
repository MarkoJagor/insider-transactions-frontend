import './App.css';
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import SideNav from './components/util/SideNav';
import Transactions from './components/transaction/Transactions';
import TransactionDetails from './components/transaction/TransactionDetails';
import PageNotFound from './components/util/PageNotFound';
import RegistrationForm from './components/account/RegistrationForm';
import LoginForm from './components/account/LoginForm';
import Watchlist from './components/watchlist/Watchlist';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <SideNav />
        <Routes>
          <Route path='/' element={<Transactions />} />
          <Route path='/transaction/:transactionId' element={<TransactionDetails />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
