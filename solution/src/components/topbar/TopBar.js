import React from 'react';
import './bar.css';

export default class TopBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand background-bar topBar">
        <p>Rômulo's Challenge</p>
      </nav>
    )
  }
}