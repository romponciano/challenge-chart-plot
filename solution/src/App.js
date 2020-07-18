import React from 'react';
import TopBar from './components/topbar/TopBar';
import InputJSON from './components/inputdata/InputJSON';
import GraphView from './components/graph/GraphView';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <InputJSON />
      <GraphView />      
    </React.Fragment>
  );
}

export default App;
