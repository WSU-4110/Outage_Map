import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Enzyme, shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import SignupForm from "../components/SignupForm.js";

configure({ adapter: new Adapter() });

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Form is rendered", () => {
    act(() => {
        render(<SignupForm />, container);
    });
    expect(container).not.toBeNull();
});


it("Check default state of signup button is disabled", () => {
    const wrapper = shallow(<SignupForm form = "test"/>);
    expect(wrapper.find('[type="submit"]').at(0));
});

it("Email Should have input", () => {
    const wrapper = shallow(<SignupForm form = "test"/>);
    expect(wrapper.find('[type="email"]').length).toBe(1);
});

it("Password Should have input", () => {
    const wrapper = shallow(<SignupForm form = "test"/>);
    expect(wrapper.find('type="password"]').length).toBe(1);
});

it("checks that the following text fields are on the page", () => {
    const wrapper = shallow(<SignupForm form = "test"/>);
    expect(wrapper.find('[type="text"]').length).toBe(2);
    expect(wrapper.find('[type="password"]').length).toBe(1);
});

it("onSubmit function of the signupform component", () => {
    const wrapper = shallow(<SignupForm form = "test"/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
});
