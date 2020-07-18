import React from 'react';
import InputJSON from './InputJSON';
import { DATA_CONTEXT } from '../../context';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UnControlled } from 'react-codemirror2';

configure({ adapter: new Adapter() });

describe('tests about basic render components', () => {
  /**
   * Test if InputJSON was render
   */
  test('should render correctly', () => {
    shallow(<InputJSON />, {context: DATA_CONTEXT});
  });

  /**
  * Test if uncontrolled codemirror was render
  */
  test('should have 1 UnControlled CodeMirror component', () => {
    let wrapper = shallow(<InputJSON />, { context: DATA_CONTEXT });
    expect(wrapper.find(UnControlled)).toHaveLength(1);
  });
})

describe('tests about UnControlled CodeMirror component', () => {
  /**
   * Test if component have uncontrolled codemirror with correct options
   */
  test('should have correct options', () => {
    let wrapper = shallow(<InputJSON />, { context: DATA_CONTEXT });
    let correctOpts = {
      mode: 'javascript',
      theme: '3024-day',
      lineNumbers: true
    }
    expect(wrapper.find({ options: correctOpts })).toHaveLength(1);
  });

});