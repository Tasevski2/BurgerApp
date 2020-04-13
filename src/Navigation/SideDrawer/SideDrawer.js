import React from 'react';

import styled from './SideDrawer.module.css';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const sideDrawer = (props) => {

    let attachedClasses = [styled.SideDrawer, styled.Close];

    if(props.show) {
         attachedClasses.splice(1, 1);
         attachedClasses.push(styled.Open);
        // attachedClasses = [styled.sideDrawer, styled.Close]
    }

    return (
        <Aux>
            <Backdrop
            show = {props.show}
            hide = {props.close}
            />
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <div className={styled.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems loggedIn={props.loggedIn}/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;