import React from 'react';
import styled from './NavigationItem.module.css';

const navigationItemButton = (props) => {
    return (
        <li className={styled.NavigationItem}>
            <button onClick={props.clicked} >
                {props.children}
            </button>
        </li>
    )
}

export default navigationItemButton;