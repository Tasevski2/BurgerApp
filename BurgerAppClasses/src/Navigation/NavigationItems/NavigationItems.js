import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItemButton from './NavigationItem/NavigationItemButton';
import Aux from '../../hoc/Aux/Aux';
import styled from './NavigationItems.module.css';


const navigationItems = (props) => {
    return (
        <ul className={styled.NavigationItems}>
            <NavigationItem
                link='/burger-builder'>
                Burger Builder
                </NavigationItem>

            {
                props.loggedIn ?
                    <Aux>
                        <NavigationItem
                            link='/orders'
                        >
                            Orders
                </NavigationItem>
                        <NavigationItemButton
                            clicked={props.clicked}>
                            Logout
                    </NavigationItemButton>
                    </Aux>
                    :
                    <NavigationItem
                        link='/auth'>
                        Authenticate
            </NavigationItem>
            }
        </ul>
    )
}



export default navigationItems;