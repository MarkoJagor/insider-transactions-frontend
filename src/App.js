import './App.css';
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import SideNavComponent from './components/SideNavComponent';
import TransactionsComponent from './components/TransactionsComponent';
import TransactionDetailsComponent from './components/TransactionDetailsComponent';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <SideNavComponent />
        <Routes>
          <Route path='/' element={<TransactionsComponent />} />
          <Route path='/transaction/:transactionId' element={<TransactionDetailsComponent />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
