import React from 'react';

export default class BottomBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand fixed-bottom bar">
        <button type="button" className="btn btn-primary">GENERATE CHART</button>
      </nav>
    );
  }
}