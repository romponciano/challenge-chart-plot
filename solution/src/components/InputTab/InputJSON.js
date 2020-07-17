import React from 'react';
// codemirror css
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';
// codemirror js
import js from 'codemirror/mode/javascript/javascript';
import CodeMirror from 'codemirror/lib/codemirror.js';
import './intelieJSON.css';

export default class InputJSON extends React.Component {

  componentDidMount() {
    transformTextAreaInCode();
  }

  render() {
    return(
      <textarea id="eventsJson"></textarea>
    )
  }
}

function transformTextAreaInCode() {
  const editor = CodeMirror.fromTextArea(document.getElementById('eventsJson'), {
    lineNumbers: true,
    mode: {json: true},
    pasteLinesPerSelection: true,
    mode: "javascript",
    theme: "3024-day",
    autoFocus: true
  });
  editor.setSize(null, 300);
  editor.refresh();
  editor.focus();
}