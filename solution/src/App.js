import React from 'react';
import './App.css';
import TopBar from './components/bar/TopBar';
import InputJSON from './components/inputtab/InputJSON';
import BottomBar from './components/bar/BottomBar';
import LineGraph from './components/graph/LineGraph';

function App() {
  return (
    <React.Fragment>
      <TopBar></TopBar>
      <InputJSON />
      <LineGraph />
      <BottomBar />
    </React.Fragment>
  );
}

export default App;
