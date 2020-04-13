import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncImport from './hoc/asyncImport/asyncImport';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';

const asyncCheckout = asyncImport(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncImport(() => {
  return import('./containers/Auth/Auth');
});

const asyncOrders = asyncImport(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/burger-builder' component={BurgerBuilder} />
        <Route path='/auth' component={asyncAuth} />
        <Redirect to='/burger-builder' />
      </Switch>
    );

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/burger-builder' component={BurgerBuilder} />
          <Route path='/auth' component={asyncAuth} /> 
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Redirect to='/burger-builder' />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
