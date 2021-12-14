import React from 'react';
import ReactDOM from 'react-dom';
import UserLogin from '../components/userLogin';
import {Enzyme, shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from 'axios';


configure({ adapter: new Adapter() }); 
const wrapper = shallow(<userLogin />);
describe("rendering userLogin component", ()=>{
    it("renders userLogin component without crashing", ()=>{
        shallow(<userLogin />);
    });
    
    it('validates on button click', () => {
        const handleSubmit = jest.fn();
        let wrapper = mount(
            <userLogin handleSubmit={handleSubmit}/>
        );
        const instance = wrapper.instance();
        const submitBtn = axios.find('/login')
        submitBtn.simulate('click')
        expect(handleSubmit).toHaveBeenCalled();
      });
      it('should fail if no credentials are provided', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const fakeLogin = shallow(<userLogin />);
        expect(fakeLogin.find('login').length).toBe(1);
        fakeLogin.find('login').simulate('submit', fakeEvent);
        expect(fakeLogin.find(Notification).length).toBe(1);
    });
})