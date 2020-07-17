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

  getJSONArray = () => {
    let typeString = 'type';
    let timestampString = 'timestamp';
    let selectString = 'select';
    let groupString = 'group';
    let beginString = 'begin';
    let endString = 'end';
    let osString = 'os';
    let browserString = 'browser';
    let minString = 'min_response_time';
    let maxString = 'max_response_time';
  
    let jsonArr = []
  
    this.state.codeEditor.eachLine(line => {
      let txt = line.text;
      txt = txt.replace(/\s/g,'');
  
      txt = txt.replace(typeString+":", '"'+typeString+'":');
      txt = txt.replace(timestampString+":", '"'+timestampString+'":');
  
      if(txt.includes('start')) {
        txt = txt.replace(selectString+":", '"'+selectString+'":');
        txt = txt.replace(groupString+":", '"'+groupString+'":');
      }
      else if(txt.includes('span')) {
        txt = txt.replace(beginString+":", '"'+beginString+'":');
        txt = txt.replace(endString+":", '"'+endString+'":');
      }
      else if(txt.includes('data')) {  
        txt = txt.replace(osString+":", '"'+osString+'":');
        txt = txt.replace(browserString+":", '"'+browserString+'":');
        txt = txt.replace(minString+":", '"'+minString+'":');
        txt = txt.replace(maxString+":", '"'+maxString+'":');      
      }
  
      txt = txt.replace(/\'/g, '"');
      if(txt && txt.length > 0) {
        jsonArr.push(JSON.parse(txt));
      }
    })
    
    return jsonArr;
  }  

  render() {
    return (
      <DATA_CONTEXT.Provider value={{
        ...this.state,
        setJSONData: this.setJSONData,
        setEditor: this.setEditor,
        getJSONArray: this.getJSONArray
      }}>{this.props.children}
      </DATA_CONTEXT.Provider>
    )
  }
}

export { DataProvider, DATA_CONSUMER, DATA_CONTEXT };