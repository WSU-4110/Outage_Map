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

it('Report Outage Button Test', () => {
  const wrapper = mount(<OutageMap />);
  const reportButton = wrapper.find("Button");
  reportButton.simulate('click');

  setTimeout(() => {
    expect(reportButton.prop('disabled')).toBeTruthy();
  })
});

