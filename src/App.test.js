import React from "react"
import { render } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
});

test('snapshot test', () => {
  const { asFragment } = render(<App/>)
  expect(asFragment()).toMatchSnapshot()
})