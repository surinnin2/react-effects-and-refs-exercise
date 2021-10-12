import React from "react";
import { render } from "@testing-library/react";
import Deck from "./Deck";

test('renders page', () => {
    render(<Deck/>);
  });
  
  test('snapshot test', () => {
    const { asFragment } = render(<Deck/>)
    expect(asFragment()).toMatchSnapshot()
  })