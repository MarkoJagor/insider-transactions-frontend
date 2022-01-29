import './App.css';
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import SideNavComponent from './components/SideNavComponent';
import TableDataComponent from './components/TableDataComponent';
import TransactionsComponent from './components/TransactionsComponent';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <SideNavComponent />
        <Routes>
          <Route path='/' element={<TransactionsComponent />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
