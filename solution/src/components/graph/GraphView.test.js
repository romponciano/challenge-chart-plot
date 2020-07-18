import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GraphView from './GraphView';
import Chart from 'react-google-charts';
import GraphControlBar from './GraphControlBar';
import { LOADING_CHART } from '../../Constants';
import { cleanup } from '@testing-library/react';
import { getDataTableStruct } from './GraphView';
import { DATA_CONTEXT, DataProvider } from '../../context';

configure({adapter: new Adapter()});

describe('tests about components inside GraphView', () => {
  /**
  * Test if component render correctly
  */
  test('should render GraphView correctly', () => {
    shallow(<GraphView />);
  });

  /**
   * Test if component have 1 Chart
   */
  test('should have 1 Chart component', () => {
    let wrapper = shallow(<GraphView />);
    expect(wrapper.find(Chart)).toHaveLength(1);
  });

  /**
   * Test if component have 1 GraphControlBar
   */
  test('should have 1 GraphControlBar', () => {
    let wrapper = shallow(<GraphView />);
    expect(wrapper.find(GraphControlBar)).toHaveLength(1);
  });

  /**
   * Test if generateGraphClickCallback change state.chartData correctly
   */
  test('should generateGraphClickCallback update chartData correctly', () => {
    let wrapper = mount(
      <DATA_CONTEXT.Provider value={{
        getJSONArray: () => { return global.exampleJsonArray }
      }}>
        <GraphView />
      </DATA_CONTEXT.Provider>
    )
    wrapper.instance().generateGraphClickCallback();
    expect(wrapper.state('chartData')).toEqual(global.exampleChartArray);
  });
})

describe('tests about Chart parameters', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GraphView />);
  })
  afterEach(cleanup);

  /**
   * Test if chart options are correct
   */
  test('should have correct options', () => {
    let correctOpts = {
      chartArea: { left: "3%", top: "7%", right: "16%", width: "100%", height: "80%" },
      vAxis: { textPosition: 'none' },
      hAxis: { gridlines: { color: 'transparent' }, format: 'mm:ss' },
      pointsVisible: true,
      interpolateNulls: true
    };
    expect(wrapper.find({options: correctOpts})).toHaveLength(1);
  });

  /**
   * Test if graph have type LineChart
   */
  test('should have graph type LineChart', () => {
    expect(wrapper.find({chartType: 'LineChart'})).toHaveLength(1);
  });

  /**
   * Test if graph have loader with correct string
   */
  test('should have loader with correct string', () => {
    let correctLoader = '<div>'+LOADING_CHART+'</div>';
    expect(wrapper.find({loader: correctLoader}));
  });

  /**
   * Test chart data change if state.chartData changes
   */
  test('should have chart data bind to state', () => {
    wrapper.setState({ chartData: null});
    expect(wrapper.find(Chart).prop('data')).toBeNull();
    let arrTest = [[0,0],[1,1]];
    wrapper.setState({ chartData: arrTest });
    expect(wrapper.find(Chart).prop('data')).toEqual(arrTest);
  });
});

describe('test GraphView functions which convert json/arrays', () => {
  /**
   * Test if the pass of an undefined to the main convert method will 
   * return simple chart array data to plot blank graph
   */
  test('should return simple chart array data', () => {
    let correctEmptyArrayGraph = [[{ f: 'Date', type: 'date' }, { f: 'Line', type: 'number' }]];
    expect(getDataTableStruct(undefined)).toEqual(correctEmptyArrayGraph);
  });

  /**
   * Test if it returns correct chart array if pass the
   * example in README.
   * The globals are in setupTests.js
   */
  test('should return correct chart arrat in example', () => {    
    expect(getDataTableStruct(global.exampleJsonArray)).toEqual(global.exampleChartArray);
  });
})