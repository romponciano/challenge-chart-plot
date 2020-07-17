import React from 'react';

export default class GraphControlBar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand fixed-bottom background-bar">
        <button type="button" className="btn btn-primary" onClick={() => { this.props.callbackGenerateGraphClick() }}>GENERATE CHART</button>
      </nav>
    );
  }
}