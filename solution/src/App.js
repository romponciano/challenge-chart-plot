import React from 'react';
import './App.css';
import InputTab from './components/inputtab/InputTab';
import TopBar from './components/bar/TopBar';
import BottomBar from './components/bar/BottomBar';
import LineGraph from './components/graph/LineGraph';

function App() {
  return (
    <React.Fragment>
      <TopBar></TopBar>
      <InputTab></InputTab>
      <LineGraph></LineGraph>
      <BottomBar></BottomBar>
    </React.Fragment>
  );
}

export default App;
