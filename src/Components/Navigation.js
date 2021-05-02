import React from 'react';

import './Navigation.css';

const navBar = ({dateFull, timeFormat, city, setCity}) => {
    return (
        <div className='navBar'>
                <ul>
                    <li>{dateFull(new Date())}</li>
                    <li>{timeFormat(new Date())}</li>
                 
                </ul>
               
                
        </div>

    );
};

export default navBar;