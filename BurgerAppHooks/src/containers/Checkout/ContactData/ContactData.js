import React, { useState } from 'react';
import { connect } from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styled from './ContactData.module.css';
import axios from '../../../axios-post';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import withDisplayError from '../../../hoc/withDisplayError/withDisplayError';


const ContactData = (props) => {

    const [state, setState] = useState({
        contact: {
            name: {
                elementType: 'input',
                config: {
                    name: 'name',
                    displayName: 'Name',
                    placeHolder: 'Your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            email: {
                elementType: 'input',
                config: {
                    name: 'email',
                    displayName: 'Email',
                    placeHolder: 'Your email'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            street: {
                elementType: 'input',
                config: {
                    name: 'street',
                    displayName: 'Street',
                    placeHolder: 'Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: '',
                touched: false
            },
            postalCode: {
                elementType: 'input',
                config: {
                    name: 'postalCode',
                    displayName: 'Postal Code',
                    placeHolder: 'Your postal code'
                },
                validation: {
                    required: true,
                    minNums: 5,
                    maxNums: 5
                },
                valid: false,
                value: '',
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                config: {
                    name: 'deliveryMethod',
                    displayName: 'Delivery Method',
                    values: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' }
                    ]
                },
                validation: {},
                valid: true,
                value: 'fastest'
            },
        },
        wholeFormValidity: false
    });

    const checkValidity = (value, validation) => {
        let isValid = true;

        if (!validation.required) {
            return true;
        }
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.minNums && validation.maxNums) {
            isValid = value.length >= validation.minNums
                && value.length <= validation.maxNums && isValid
        }

        return isValid;
    }

    const changeFormHandler = (e, id) => {
        const updatedForm = {
            ...state.contact
        }

        const updatedFormElement = {
            ...state.contact[id]
        }
        updatedFormElement.touched = true;
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[id] = updatedFormElement;
        let formValidity = true;
        for (let el in updatedForm) {
            formValidity = updatedForm[el].valid && formValidity;
        }

        setState({
            contact: updatedForm,
            wholeFormValidity: formValidity
        });

    }


    const submitOrderHandler = (e) => {
        const order = {
            contact: {
                name: state.contact.name.value,
                email: state.contact.email.value,
                street: state.contact.street.value,
                postalCode: state.contact.postalCode.value,
                deliveryMethod: state.contact.deliveryMethod.value
            },
            ingridients: props.ingridients,
            price: props.totalPrice,
            userId: props.userId
        };

        props.postOrderData(order, props.token);
        props.resetWholeState();
        props.history.push('/burger-builder');

        e.preventDefault();
    }

        let arrState = [];

        for (let el in state.contact) {
            arrState.push({
                id: el,
                config: state.contact[el]
            });
        }
        let output = (
            <div className={styled.ContactData}>
                <h4>
                    Enter your contact data
                </h4>
                <form onSubmit={submitOrderHandler}>

                    {
                        arrState.map(el => (
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
                    }
                    <Button btnType="Success" disabled={!(state.wholeFormValidity && props.token)}>ORDER</Button>
                </form>
            </div>
        )
        if (props.loading) {
            output = <Spinner />
        }
        return output;
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerBuilder.inOrder,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetWholeState: () => dispatch(actions.resetWholeState()),
        postOrderData: (orderData, token) => dispatch(actions.postOrderData(orderData, token))
    }
}

export default withDisplayError(connect(mapStateToProps, mapDispatchToProps)(ContactData), axios);
