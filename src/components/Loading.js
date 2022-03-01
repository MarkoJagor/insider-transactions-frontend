import React from 'react'
import '../styles/layout.css'

const Loading = () => {
    return (
        <div className='loadingScreen'>
            <i className='pi pi-spin pi-spinner icon'></i>
            <p>Laen andmeid...</p>
        </div>
    )
}

export default Loading