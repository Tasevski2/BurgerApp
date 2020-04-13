import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withDisplayError = (WrappedComponent, axios) => {


    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            }, err => {
                this.setState({
                    error: err
                })
            })

            this.resInter = axios.interceptors.response.use(res => res, err => {
                this.setState({
                    error: err
                });
            });
        }

        // componentDidMount() {
        //     axios.interceptors.request.use(req => {
        //         this.setState({
        //             error: null
        //         })
        //         return req;
        //     }, err => {
        //         this.setState({
        //             error: err
        //         })
        //     })

        //     axios.interceptors.response.use(res => res, err => {
        //         this.setState({
        //             error: err
        //         });
        //     });
        // }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter);

        }

        hideError = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        hidePurchase = {this.hideError}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withDisplayError;