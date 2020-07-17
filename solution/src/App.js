import React from 'react';
import TopBar from './components/bar/TopBar';
import InputJSON from './components/inputtab/InputJSON';
import LineGraph from './components/graph/LineGraph';

function App() {
  return (
    <React.Fragment>
      <TopBar></TopBar>
      <InputJSON />
      <LineGraph />      
    </React.Fragment>
  );
}

export default App;
