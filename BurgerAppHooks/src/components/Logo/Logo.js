import React from 'react';

import styled from './Logo.module.css';
import burgerLogo from '../../assets/images/burgerLogo.png';


const logo = () => {
    return (
        <div className={styled.Logo}>
            <img src={burgerLogo} alt="My Burger Logo"/>
        </div>
    )
}

export default logo;
