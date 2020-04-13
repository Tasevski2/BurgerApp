import React from 'react';

import styled from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    console.log("RERENDER");
        return (
            <Aux>
                <Backdrop
                    show={props.show}
                    hide={props.hidePurchase}
                />
                <div className={styled.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
            </Aux>
        )
}


export default React.memo(Modal, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show;
});