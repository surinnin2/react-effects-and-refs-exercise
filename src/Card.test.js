import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test('renders page', () => {
    render(<Card/>);
  });
  
  test('snapshot test', () => {
    const { asFragment } = render(<Card/>)
    expect(asFragment()).toMatchSnapshot()
  })