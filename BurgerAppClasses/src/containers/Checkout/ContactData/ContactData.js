import React, { Component } from 'react';
import { connect } from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styled from './ContactData.module.css';
import axios from '../../../axios-post';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import withDisplayError from '../../../hoc/withDisplayError/withDisplayError';


class ContactData extends Component {

    state = {
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
    }

    checkValidity = (value, validation) => {
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

    changeFormHandler = (e, id) => {
        const updatedForm = {
            ...this.state.contact
        }

        const updatedFormElement = {
            ...this.state.contact[id]
        }
        updatedFormElement.touched = true;
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[id] = updatedFormElement;
        let formValidity = true;
        for (let el in updatedForm) {
            formValidity = updatedForm[el].valid && formValidity;
        }

        this.setState({
            contact: updatedForm,
            wholeFormValidity: formValidity
        });
    }


    submitOrderHandler = (e) => {
        const order = {
            contact: {
                name: this.state.contact.name.value,
                email: this.state.contact.email.value,
                street: this.state.contact.street.value,
                postalCode: this.state.contact.postalCode.value,
                deliveryMethod: this.state.contact.deliveryMethod.value
            },
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
            userId: this.props.userId
        };

        this.props.postOrderData(order, this.props.token);
        this.props.resetWholeState();
        this.props.history.push('/burger-builder');

        e.preventDefault();
    }

    render() {
        let arrState = [];

        for (let el in this.state.contact) {
            arrState.push({
                id: el,
                config: this.state.contact[el]
            });
        }
        let output = (
            <div className={styled.ContactData}>
                <h4>
                    Enter your contact data
                </h4>
                <form onSubmit={this.submitOrderHandler}>

                    {
                        arrState.map(el => (
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
                    }
                    <Button btnType="Success" disabled={!(this.state.wholeFormValidity && this.props.token)}>ORDER</Button>
                </form>
            </div>
        )
        if (this.props.loading) {
            output = <Spinner />
        }
        return output;
    }
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
