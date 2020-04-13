import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Orders } from './Orders';
import Order from '../../components/Order/Order';


configure({ adapter: new Adapter() });

describe('<Orders />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Orders fetchOrders={() => { }} orders={[{ }]}/>);
    });

    it('should have BuildControls if orders > 0', () => {
        expect(wrapper.exists(Order)).toBe(true);
    });
});
