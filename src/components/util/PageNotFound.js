import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import '../../styles/error.css'

const NotFound = () => {
    return (
        <main className='main'>
            <div id='notFound'>
                <div className='notFound'>
                    <div className='notFound404'>
                        <h1>404</h1>
                    </div>
                    <h2>Vabandame, lehekülge ei leitud!</h2>
                    <p>Lehekülje aadress, mida otsite, on muutunud või ei ole hetkel kättesaadav.</p>
                    <Link className='link' to='/'>
                        <Button label='Tagasi tehingute registrisse' className='p-button-info p-button-rounded' />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
