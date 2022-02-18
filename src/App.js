import './App.css';
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import SideNavComponent from './components/SideNavComponent';
import TransactionsComponent from './components/TransactionsComponent';
import TransactionDetailsComponent from './components/TransactionDetailsComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import RegistrationFormComponent from './components/registration/RegistrationFormComponent';
import LoginFormComponent from './components/registration/LoginFormComponent';
import { AccountProvider } from './context/AccountContext';

function App() {
  return (
    <AccountProvider>
      <DataProvider>
        <div className='App'>
          <SideNavComponent />
          <Routes>
            <Route path='/' element={<TransactionsComponent />} />
            <Route path='/transaction/:transactionId' element={<TransactionDetailsComponent />} />
            <Route path='/login' element={<LoginFormComponent />} />
            <Route path='/register' element={<RegistrationFormComponent />} />
            <Route path='*' element={<PageNotFoundComponent />} />
          </Routes>
        </div>
      </DataProvider>
    </AccountProvider>
  );
}

export default App;
