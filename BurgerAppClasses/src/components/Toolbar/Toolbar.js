import React from 'react';

import styled from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

const toolbar = (props) => {
    return (
        <div className={styled.Toolbar}>
                <FontAwesomeIcon icon={faHamburger} onClick={props.open} className={styled.Icon}/>
            <div className={styled.Logo}>
                <Logo />
            </div>
            <nav className={styled.DesktopOnly}>
                <NavigationItems loggedIn={props.loggedIn} clicked={props.clicked}/>
            </nav>
        </div>
    )
}

export default toolbar;