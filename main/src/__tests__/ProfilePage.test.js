import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from '../components/ProfilePage';
import {Enzyme, shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() }); 
const wrapper = shallow(<ProfilePage />);
describe("rendering ProfilePage component", ()=>{
    it("renders ProfilePage component without crashing", ()=>{
        shallow(<ProfilePage />);
    });
})