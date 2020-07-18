import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './TopBar';
import { render } from '@testing-library/react';
import { TOP_NAVBAR_TEXT } from '../../Constants';

/**
 * If can attach TopBar inside div, then
 * it renders without crash
 */
it('renders without crash', () => {
  let div = document.createElement('div');
  ReactDOM.render(<TopBar/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

/**
 * Renders navbar correct with correct childs
 */
it('renders navbar correctly', () => {
  let {getByTestId} = render(<TopBar />);
  expect(getByTestId('topNavBar')).toBeTruthy();
})

/**
 * Renders the name in navbar correctly
 */
it('renders navbar name correctly', () => {
  let {getByTestId} = render(<TopBar />);
  expect(getByTestId('topNavBarName')).toHaveTextContent(TOP_NAVBAR_TEXT);
})