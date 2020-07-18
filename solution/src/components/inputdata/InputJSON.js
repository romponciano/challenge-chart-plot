import React from 'react';
import { DATA_CONTEXT } from '../context';
// codemirror css
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/mode/javascript/javascript.js';
// codemirror core
import {UnControlled} from 'react-codemirror2';
// intelie css
import './intelieJSON.css';

export default class InputJSON extends React.Component {

  render() {
    return (
      <UnControlled
        options={{
          mode: 'javascript',
          theme: '3024-day',
          lineNumbers: true
        }}
        onChange={(editor, data, value) => { this.context.setEditor(value); }}
       />
    )
  }
}

InputJSON.contextType = DATA_CONTEXT;