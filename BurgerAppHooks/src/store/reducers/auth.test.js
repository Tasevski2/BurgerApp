import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

configure({ adapter: new Adapter() });

describe('auth reducer', () => {
    it('token and userId should be set on auth success', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, {
            type: actionTypes.AUTH_SUCCESS,
            payload: {
                token: 'some-token',
                userId: 'some-userId'
            }
        }
        )).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false
        }
        );
    });
})