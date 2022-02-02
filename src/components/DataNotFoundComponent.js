import '../styles/error.css'

const DataNotFoundComponent = () => {
    return (
        <main className='main'>
            <div id='notFound'>
                <div className='notFound'>
                    <div className='notFound404'>
                        <h1>Viga</h1>
                    </div>
                    <h2>Vabandame, andmed ei ole hetkel kättesaadavad.</h2>
                    <p>Andmete kuvamisel on tekkinud viga. Palun proovige hiljem uuesti.</p>
                </div>
            </div>
        </main>
    )
};

export default DataNotFoundComponent;
