import React from 'react';

const DATA_CONTEXT = React.createContext();
const DATA_CONSUMER = DATA_CONTEXT.Consumer;

class DataProvider extends React.Component {
  state = {
    json: undefined,
    codeEditor: undefined
  }

  setJSONData = (props) => {
    let data = this.state.codeEditor.getValue();
    this.setState(() => {
      return {
        json: data
      }
    }, () => {
      props.callbackGenerateGraphClick();
    })
  }

  setEditor = (edt) => {  
    this.setState(() => {
      return {
        codeEditor: edt
      }
    });
  }

  getCodeMirror = () => {
    return this.state.codeEditor;
  }

  render() {
    return (
      <DATA_CONTEXT.Provider value={{
        ...this.state,
        setJSONData: this.setJSONData,
        setEditor: this.setEditor,
        getCodeMirror: this.getCodeMirror
      }}>{this.props.children}
      </DATA_CONTEXT.Provider>
    )
  }
}

export { DataProvider, DATA_CONSUMER, DATA_CONTEXT };