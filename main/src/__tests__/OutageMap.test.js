import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Enzyme, shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import OutageMap from "../components/OutageMap.js";
import OutageIndicator from "../components/OutageMap.js";

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

//function OutageMap rendering test
it("Map is rendered", () => {
    act(() => {
        render(<OutageMap />, container);
    });
    expect(container).not.toBeNull();
});

//function OutageIndicator rendering test
it("Indicator rendered", () => {
  act(() => {
      render(<OutageIndicator />, container);
  });
  expect(container).not.toBeNull();
});

it('setReportIsOpenFalse is called and reportIsOpen State is validated', () => {
  const wrapper = mount(<OutageMap />);
  const reportButton = wrapper.find("Button");
  reportButton.simulate('click');

  setTimeout(() => {
    expect(setReportIsOpenFalse).toHaveBeenCalled();
    expect(reportIsOpen).toBeFalsy();
  })
});

it('setReportIsOpenTrue is called and reportIsOpen State is validated', () => {
  const wrapper = mount(<OutageMap />);
  const reportButton = wrapper.find("Button");
  reportButton.simulate('click');

  setTimeout(() => {
    expect(setReportIsOpenTrue).toHaveBeenCalled();
    expect(reportIsOpen).toBeTruthy();
  })
});


it('fetchOutages is called and state is validated', () => {
  const wrapper = mount(<OutageMap />);

  setTimeout(() => {
    expect(fetchOutages).toHaveBeenCalled();
    expect(wrapper.state(allOutages)).not.toBeNull();
  })
});

it('resolveLocation is called state is validated', () => {
  const wrapper = mount(<OutageIndicator />);

  setTimeout(() => {
    expect(resolveLocation).toHaveBeenCalled();
    expect(wrapper.state(coords)).not.toBeNull();
  })
});

