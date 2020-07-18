import React from 'react';
import './bar.css';
import { TOP_NAVBAR_TEXT } from '../../Constants';

export default class TopBar extends React.Component {
  render() {
    return (
      <nav data-testid="topNavBar" className="navbar navbar-expand background-bar topBar">
        <p data-testid="topNavBarName">{TOP_NAVBAR_TEXT}</p>
      </nav>
    )
  }
}