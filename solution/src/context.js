import React from 'react';
import { FIELD_TYPE, FIELD_TIMESTAMP, FIELD_SELECT, FIELD_GROUP, FIELD_BEGIN, FIELD_END, FIELD_OS, FIELD_BROWSER, FIELD_MIN, FIELD_MAX, TYPE_START, TYPE_SPAN, TYPE_DATA } from './Constants';

const DATA_CONTEXT = React.createContext();
const DATA_CONSUMER = DATA_CONTEXT.Consumer;

class DataProvider extends React.Component {
  state = {
    codeEditor: undefined
  }

  setEditor = (edt) => {  
    this.setState(() => {
      return {
        codeEditor: edt
      }
    });
  }

  /**
   * Function to get json code text and convert to real JSON Array
   * where each element is a JSON.
   */
  getJSONArray = () => {
    let jsonArr = [];
    // iterate through code editor lines
    this.state.codeEditor.eachLine(line => {
      // get line val as string
      let txt = line.text;
      // trim all whitespaces
      txt = txt.replace(/\s/g,'');
      // place "" in fields
      txt = this.insertDoubleQuoteInsideField(txt, FIELD_TYPE);
      txt = this.insertDoubleQuoteInsideField(txt, FIELD_TIMESTAMP);
      if(txt.includes(TYPE_START)) {
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_SELECT);
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_GROUP);
      }
      else if(txt.includes(TYPE_SPAN)) {
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_BEGIN);
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_END);
      }
      else if(txt.includes(TYPE_DATA)) {  
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_OS);
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_BROWSER);
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_MIN);
        txt = this.insertDoubleQuoteInsideField(txt, FIELD_MAX);
      }
      // replace all ' to "
      txt = txt.replace(/'/g, '"');
      // if has any text, convert line to json
      if(txt && txt.length > 0) {
        jsonArr.push(JSON.parse(txt));
      }
    })
    return jsonArr;
  }

  insertDoubleQuoteInsideField = (text, field) => {
    return text.replace(field+":", '"'+field+'":');
  }

  // using Object.assign instead of spread syntax (...this.state)
  // because Edge doest not support spread syntax
  render() {
    return (
      <DATA_CONTEXT.Provider value={{
        state: Object.assign(this.state),
        setJSONData: this.setJSONData,
        setEditor: this.setEditor,
        getJSONArray: this.getJSONArray
      }}>{this.props.children}
      </DATA_CONTEXT.Provider>
    )
  }
}

export { DataProvider, DATA_CONSUMER, DATA_CONTEXT };