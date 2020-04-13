import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';


const withDisplayError = (WrappedComponent, axios) => {
    return (props) => {
        const { error, hideError } = useHttpErrorHandler(axios);
            return (
                <Aux>
                    <Modal
                        show={error ? true : false}
                        hidePurchase={hideError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            )
        }
}

export default withDisplayError;