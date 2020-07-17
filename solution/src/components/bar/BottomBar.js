import React from 'react';
import { DATA_CONSUMER } from '../../context';
import CodeMirror from 'codemirror/lib/codemirror.js';

export default class BottomBar extends React.Component {

  render() {
    return (
      <DATA_CONSUMER>
        {(cxt) => {
          return (
            <nav className="navbar navbar-expand fixed-bottom bar">
              <button type="button" className="btn btn-primary" onClick={() => { cxt.setJSONData(); }}>GENERATE CHART</button>
            </nav>
          )
        }}
      </DATA_CONSUMER>
    );
  }
}