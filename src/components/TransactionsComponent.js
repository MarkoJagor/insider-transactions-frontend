import React from 'react';
import ToolbarComponent from './ToolbarComponent';
import TransactionsTableComponent from './TransactionsTableComponent';

const TransactionsComponent = () => {
    return (
        <main style={{ width: '100%' }}  >

            <ToolbarComponent />


            <TransactionsTableComponent />

        </main>
    );
};

export default TransactionsComponent;
