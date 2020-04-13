import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import styled from './Auth.module.css';
import * as actions from '../../store/actions/index';

const Auth = (props) => {

    const [state, setState ] = useState({
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
    });

    const checkValidity = (value, validation) => {
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

    const changeFormHandler = (e, element) => {
        const updatedForm = {
            ...state.auth,
            [element]: {
                ...state.auth[element],
                value: e.target.value,
                valid: checkValidity(e.target.value, state.auth[element].validation),
                touched: true
            }
        }
        setState(prevState => {
            return {
                ...prevState,
                auth: updatedForm
            }
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.onAuth(state.auth.email.value, state.auth.password.value, state.isSignUp);
    }

    const modeChangeHandler = () => {
        setState(prevState => {
            return {
                ...prevState,
                isSignUp: !prevState.isSignUp
            }
        })

    }

    let arrState = [];
    for (let el in state.auth) {
        arrState.push({
            id: el,
            config: state.auth[el]
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
            changed={(e) => changeFormHandler(e, el.id)}
        />
    ))
    let output = <Spinner />
    if (!props.loading) {
        output = <Aux>
            <form onSubmit={submitHandler}>
                {inputs}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button btnType='Danger' clicked={modeChangeHandler}>Switch to {state.isSignUp ? 'SIGN IN' : 'SING UP'}</Button>
        </Aux>
    }
    let redirect = <Redirect to='/' />;
    if (props.orders) {
        redirect = <Redirect to='/checkout' />
    }

    return (
        <div className={styled.Auth}>
            {props.token ? redirect : null}
            {props.error ? props.error : null}
            {output}
        </div>
    )
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