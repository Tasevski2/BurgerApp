import React from 'react';

import styled from './Backdrop.module.css';

const backDrop = (props) => (
    props.show ? <div 
    className={styled.Backdrop}
    onClick={props.hide} 
    ></div> : null
)

export default backDrop;