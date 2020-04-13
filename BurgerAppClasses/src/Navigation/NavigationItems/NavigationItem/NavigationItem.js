import React from 'react';

import styled from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={styled.NavigationItem}>
        <NavLink 
        to = {props.link}
        activeClassName={styled.active}>
            {props.children}</NavLink>
    </li>
)

export default navigationItem;