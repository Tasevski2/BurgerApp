import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import styled from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        auth: {
            email: {
                elementType: 'input',
                config: {
                    name: 'email',
                    displayName: 'Email',
                    placeHolder: 'Your email'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                value: '',
                touched: false
            },
            password: {
                elementType: 'input',
                config: {
                    name: 'password',
                    displayName: 'Password',
                    placeHolder: 'Password'
                },
                validation: {
                    required: true,
                    minNums: 6
                },
                valid: false,
                value: '',
                touched: false
            }
        },
        isSingUp: true
    }

    checkValidity = (value, validation) => {
        let isValid = true;

        if (!validation.required) {
            return true;
        }
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.minNums) {
            isValid = value.length >= validation.minNums;
        }


        return isValid;
    }

    changeFormHandler = (e, element) => {
        const updatedFrom = {
            ...this.state.auth,
            [element]: {
                ...this.state.auth[element],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.auth[element].validation),
                touched: true
            }
        }
        this.setState({
            auth: updatedFrom
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.auth.email.value, this.state.auth.password.value, this.state.isSignUp);
    }

    modeChangeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        let arrState = [];
        for (let el in this.state.auth) {
            arrState.push({
                id: el,
                config: this.state.auth[el]
            });
        }

        const inputs = arrState.map(el => (
            <Input
                key={el.id}
                elementtype={el.config.elementType}
                config={el.config.config}
                value={el.config.value}
                invalid={!el.config.valid}
                touched={el.config.touched}
                changed={(e) => this.changeFormHandler(e, el.id)}
            />
        ))
        let output = <Spinner />
        if (!this.props.loading) {
            output = <Aux>
                <form onSubmit={this.submitHandler}>
                    {inputs}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.modeChangeHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SING UP'}</Button>
            </Aux>
        }
        let redirect = <Redirect to='/'/>;
        if (this.props.orders) {
            redirect = <Redirect to='/checkout' />
        }
        return (
            <div className={styled.Auth}>
                {this.props.token ? redirect : null}
                {this.props.error ? this.props.error : null}
                {output}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        orders: state.burgerBuilder.inOrder.length !== 0 ? true : false
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Auth);