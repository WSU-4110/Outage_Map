import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Enzyme, shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../App';
import NavBar from '../components/NavBar';
import ReportOutage from '../components/ReportOutage';

configure({ adapter: new Adapter() });

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//test of App being rendered
it("App is rendered", () => {
    act(() => {
        render(<App />, container);
    });
    expect(container).not.toBeNull();
});

//test of NavBar being rendered
it("NavBar is rendered", () => {
  act(() => {
      render(<NavBar />, container);
  });
  expect(container).not.toBeNull();
});

it('Renders ReportOutage form', () => {
  act(() =>{
    render(<ReportOutage />, container);
  })

  expect(container).not.toBeNull();
});

it('Simulates submit button click and confirms handleSubmitReport', () => {
  const wrapper = mount(<ReportOutage />);
  expect(wrapper.find('form')).toHaveLength(1);
  const submitButton = wrapper.find('Button');
  expect(submitButton.find({ prop: 'type' })).toEqual('submit');
  expect(submitButton.prop('type')).toEqual('submit');
  expect(submitButton.text()).toEqual('Report Outage');

  submitButton.simulate('click');

  setTimeout(() => {
    expect(handleSubmitReport).toHaveBeenCalled();
  })
});

it('Tests select element to see onChange',() =>{
  const wrapper = mount(<ReportOutage/>)
  expect(wrapper.find('select').props().value).toBeNull;

  wrapper.find('select').simulate('change', {target: {value: 'Streaming'}});
  expect(wrapper.find('select').props().value).toBe('Streaming');
})



// it('setReportIsOpenTrue is called and reportIsOpen State is validated', () => {
//   const wrapper = mount(<OutageMap />);
//   const reportButton = wrapper.find("Button");
//   reportButton.simulate('click');

//   setTimeout(() => {
//     expect(setReportIsOpenTrue).toHaveBeenCalled();
//     expect(reportIsOpen).toBeTruthy();
//   })
// });