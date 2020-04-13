import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';

const AsyncCheckout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const AsyncAuth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const AsyncOrders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const App = (props) => {

  const { autoLogin } = props;

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  let routes = (
    <Switch>
      <Route path='/burger-builder' component = {BurgerBuilder} />
      <Route path='/auth' component = {AsyncAuth} />
      <Redirect to='/burger-builder' />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path='/burger-builder' component ={ BurgerBuilder} />
        <Route path='/auth' component = {AsyncAuth} />
        <Route path='/checkout' component = {AsyncCheckout} />
        {/* <Route path='/checkout' render = {(props) => <AsyncCheckout {...props}/>} /> */}
        <Route path='/orders' component = {AsyncOrders} />
        <Redirect to='/burger-builder' />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );

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
