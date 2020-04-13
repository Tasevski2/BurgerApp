import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import Aux from '../Aux/Aux';
import styled from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    state = {
        showSideDrawer: false,
        logout: false
    }
    componentDidUpdate() {
        if(this.state.logout) {
            this.setState({
                logout: false
            })
        }
    }

    hideSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    showSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    logout = () => {
        this.setState({
            logout: true
        });
        this.props.authLogout();
    }

    render() {
        return (
            <Aux>
                {this.state.logout ? 
                    <Redirect to='/' />
                :
                null}
                <Toolbar
                    open={this.showSideDrawerHandler}
                    loggedIn={this.props.token ? true : false}
                    clicked={this.logout} />
                <SideDrawer
                    show={this.state.showSideDrawer}
                    close={this.hideSideDrawerHandler}
                    loggedIn={this.props.token ? true : false} />
                <main className={styled.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
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
