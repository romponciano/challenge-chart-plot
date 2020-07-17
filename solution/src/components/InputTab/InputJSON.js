import React from 'react';
// codemirror css
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';
// codemirror js
import js from 'codemirror/mode/javascript/javascript';
import CodeMirror from 'codemirror/lib/codemirror.js';
import './intelieJSON.css';
import { DATA_CONTEXT } from '../../context';

export default class InputJSON extends React.Component {

  componentDidMount() {    
    this.context.setEditor(transformTextAreaInCode());
  }

  render() {
    return (
      <textarea id="jsonCode" className="stylishScrollBar" />
    )
  }
}

InputJSON.contextType = DATA_CONTEXT;

function transformTextAreaInCode() {
  let editor = CodeMirror.fromTextArea(document.getElementById('jsonCode'), {
    lineNumbers: true,
    mode: { json: true },
    pasteLinesPerSelection: true,
    mode: "javascript",
    theme: "3024-day",
    autoFocus: true
  });
  editor.setSize(null, 240);
  editor.refresh();
  return editor;
}