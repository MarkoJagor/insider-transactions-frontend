import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from 'primereact/divider'
import TransactionService from '../services/TransactionService';
import '../styles/transactiondetails.css'

const TransactionDetailsComponent = () => {
    const { transactionId } = useParams()
    const [transaction, setTransaction] = useState({})

    useEffect(() => {
        const loadTransaction = async () => {
            const response = await TransactionService.getTransactionById(transactionId)
            setTransaction(response.data)
        }
        loadTransaction()
    }, []);

    const totalPrice = (volume, price) => {
        return (volume * price).toFixed(2)
    }

    return (
        <main className='detailsContent'>
            <h1 className='detailsHeader'>Börsiemitendiga seotud isiku tehingu detailid</h1>
            <div className='borderedBox'>
                <div className='boxContent'>
                    <Divider align='left'>
                        <h3>Emitent</h3>
                    </Divider>
                    <p><b>Nimi:</b> {transaction.issuer}</p>
                    <Divider align='left'>
                        <h3>Juhtimiskohustusi täitva isiku / temaga lähedalt seotud isiku andmed</h3>
                    </Divider>
                    <p><b>Nimi:</b> {transaction.investor}</p>
                    <p><b>Positsioon:</b> {transaction.investorPosition}</p>
                    <Divider align='left'>
                        <h3>Finantsinstrumendi ning tehingu tüüp</h3>
                    </Divider>
                    <p><b>Finantsinstrumendi tüüp:</b> {transaction.instrument}</p>
                    <p><b>Tehingu tüüp:</b> {transaction.transactionType}</p>
                    <Divider align='left'>
                        <h3>Tehingu maht ning väärtus</h3>
                    </Divider>
                    <p><b>Tehingu maht:</b> {transaction.volume}</p>
                    <p><b>Tehingu hind ühe ühiku kohta:</b> {transaction.price}</p>
                    <p><b>Tehingu koondhind:</b> {totalPrice(transaction.volume, transaction.price)}</p>
                    <Divider align='left'>
                        <h3>Muud andmed</h3>
                    </Divider>
                    <p><b>Tehingu kuupäev:</b> {transaction.tradeDate}</p>
                    <p><b>Tehingu avalikustamise kuupäev:</b> {transaction.publishedDate}</p>
                    <p><b>Tehingu koht:</b> {transaction.market}</p>
                    <p><b>Algne teade / muudatus:</b> {transaction.hasBeenUpdated ? 'Muudatus' : 'Algne teade'}</p>
                    {transaction.updateReason !== '' && <p><b>Muudatuse põhjus:</b> {transaction.updateReason}</p>}
                </div>
            </div>
        </main >
    );
};

export default TransactionDetailsComponent;
