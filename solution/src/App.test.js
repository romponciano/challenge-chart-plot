import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import TopBar from './components/topbar/TopBar';
import InputJSON from './components/inputdata/InputJSON';
import GraphView from './components/graph/GraphView';

configure({ adapter: new Adapter() });

describe('should have all base components in App', () => {
  test('should have 1 TopBar component', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find(TopBar)).toHaveLength(1);
  });

  test('should have 1 InputJSON component', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find(InputJSON)).toHaveLength(1);
  });

  test('should have 1 GraphView component', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find(GraphView)).toHaveLength(1);
  });
})