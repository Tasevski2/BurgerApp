import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItemButton from './NavigationItem/NavigationItemButton';


configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
       wrapper = shallow(<NavigationItems />);
    });

    it('should have 2 NavigationItem elements if not authorized', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should have 2 Navigation Item elements if authorized', () => {
        wrapper.setProps({ loggedIn: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should have 1 Navigation Item Button if authorized', () => {
        wrapper.setProps({ loggedIn: true });
        expect(wrapper.find(NavigationItemButton)).toHaveLength(1);
    });
});
