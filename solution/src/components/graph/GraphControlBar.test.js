import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GraphControlBar from './GraphControlBar';
import { GENERATE_CHART } from '../../Constants';
import { cleanup } from '@testing-library/react';
import GraphView from './GraphView';

configure({adapter: new Adapter()})

describe('tests about the render process of GraphControbal component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GraphControlBar />);
  });
  afterEach(cleanup);

  /**
   * Test if component have a navbar com fixed-bottom
   * class. It's a business rule, so it's important 
   * to test
   */
  test('should have navbar fixed-bottom', () => {
    expect(wrapper.find('nav').hasClass('fixed-bottom')).toBe(true);
  });

  /**
   * Test if component have a button with correct text
   */
  test('should have a button with GENERATE_CHART cons value', () => {
    expect(wrapper.find('button').text()).toEqual(GENERATE_CHART);
  });
});

describe('tests about generate chart button action', () => {
  let spy;
  let wrapper;
  let button;
  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow(<GraphControlBar callbackGenerateGraphClick={spy} />);
    button = wrapper.find('button');
  });
  afterEach(cleanup);

  /**
   * Test if 1 click generate 1 callback
   */
  test('should callback 1 time if have 1 onClick', () => {
    button.props().onClick();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  /**
   * Test if 2 click generate 2 callback
   */
  test('should callback n time if have n onClick', () => {
    let clickCounts = 2;
    for(let i=0; i < clickCounts; i++) {
      button.props().onClick();
    }
    expect(spy).toHaveBeenCalledTimes(clickCounts);
  });

  /**
   * Test if 0 click generate 0 callback
   */
  test('should not callback if has no click', () => {
    expect(spy).toHaveBeenCalledTimes(0);
  });
});