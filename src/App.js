import './App.css';
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import SideNavComponent from './components/SideNavComponent';
import TransactionsComponent from './components/TransactionsComponent';
import TransactionDetailsComponent from './components/TransactionDetailsComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import RegistrationFormComponent from './components/registration/RegistrationFormComponent';
import LoginFormComponent from './components/registration/LoginFormComponent';
import WatchlistComponent from './components/WatchlistComponent';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <SideNavComponent />
        <Routes>
          <Route path='/' element={<TransactionsComponent />} />
          <Route path='/transaction/:transactionId' element={<TransactionDetailsComponent />} />
          <Route path='/watchlist' element={<WatchlistComponent />} />
          <Route path='/login' element={<LoginFormComponent />} />
          <Route path='/register' element={<RegistrationFormComponent />} />
          <Route path='*' element={<PageNotFoundComponent />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
