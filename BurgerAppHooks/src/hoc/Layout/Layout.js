import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import Aux from '../Aux/Aux';
import styled from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

const Layout = (props) =>  {

    const [ showSideDrawer, setShowSideDrawer ] = useState(false);
    const [ logoutState, setLogout ] = useState(false);

    useEffect(() => {
        if(logoutState) {
            setLogout(false);
        }
    }, [logoutState]);

    const hideSideDrawerHandler = () => {
        setShowSideDrawer(false);
    }

    const showSideDrawerHandler = () => {
        setShowSideDrawer(true);
    }

    const logout = () => {
        setLogout(true);
        props.authLogout();
    }

        return (
            <Aux>
                { logoutState ? 
                    <Redirect to='/' />
                :
                null }
                <Toolbar
                    open={showSideDrawerHandler}
                    loggedIn={props.token ? true : false}
                    clicked={logout} />
                <SideDrawer
                    show={showSideDrawer}
                    close={hideSideDrawerHandler}
                    loggedIn={props.token ? true : false} />
                <main className={styled.Content}>
                    {props.children}
                </main>
            </Aux>
        )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
