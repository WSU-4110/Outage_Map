import React from 'react';
import ReactDOM from 'react-dom';
import UserLogin from '../components/userLogin';
import {Enzyme, shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


configure({ adapter: new Adapter() }); 
const wrapper = shallow(<userLogin />);
describe("rendering userLogin component", ()=>{
    it("renders userLogin component without crashing", ()=>{
        shallow(<userLogin />);
    });

    it('should have input for email and password', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('input[type="email"]')).toHaveLength(0);
        expect(wrapper.find('input[type="password"]')).toHaveLength(0);
    });
    it('should have an empty email and password variable on setup', ()=> {
        //test to check if password and email are empty strings on setup
        expect(wrapper.find('email')).toEqual({});
        expect(wrapper.find('password')).toEqual({});
    });
    it('should have a login button', ()=>{
        //Button should be of type button
        expect(wrapper.find('Button')
        .type().defaultProps.type)
        .toEqual('button');

        //Button should have matching text
        expect(wrapper.find('Button').text()).toEqual('Login');
    });
})