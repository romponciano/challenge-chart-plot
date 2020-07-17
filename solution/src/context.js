import React from 'react';

const DATA_CONTEXT = React.createContext();
const DATA_CONSUMER = DATA_CONTEXT.Consumer;

class DataProvider extends React.Component {
  state = {
    json: undefined,
    codeEditor: undefined
  }

  setJSONData = () => {
    let data = this.state.codeEditor.getValue();
    console.log(data);
    this.setState(() => {
      return {
        json: data
      }
    })
  }

  setEditor = (edt) => {  
    this.setState(() => {
      return {
        codeEditor: edt
      }
    });
  }

  render() {
    return (
      <DATA_CONTEXT.Provider value={{
        ...this.state,
        setJSONData: this.setJSONData,
        setEditor: this.setEditor
      }}>{this.props.children}
      </DATA_CONTEXT.Provider>
    )
  }
}

export { DataProvider, DATA_CONSUMER, DATA_CONTEXT };