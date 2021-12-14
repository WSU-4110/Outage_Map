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
    it ("check to see if the user is logged in based on local storage", ()=>{
        function locStorageTest() {
            let locstorage = {};
        
            return {
              setItem: function(key, value) {
                locstorage[key] = value || '';
              },
              getItem: function(key) {
                return key in locstorage ? locstorage[key] : null;
              },
              removeItem: function(key) {
                delete locstorage[key];
              },
              get length() {
                return Object.keys(locstorage).length;
              },
              key: function(i) {
                const keys = Object.keys(locstorage);
                return keys[i] || null;
              }
            };
          }
        window.localStorage = locStorageTest();

    });
    describe('table from server return', () => {
        const wrapper = mount(
            <OutageTable tableOutage={tableOutage} />
        );
        it ('renders table correctly', ()=>{
            expect(wrapper.find('tbody').children()).to.have.length(tableOutage.length);
            expect(wrapper.find('tbody').children().find('tr')).to.have.length(tableOutage.length);
        });
    });

})