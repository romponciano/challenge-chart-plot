import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DataProvider } from './context';
import { cleanup } from '@testing-library/react';
import { FIELD_TYPE } from '../Constants';

configure({adapter: new Adapter()});

describe('tests about component render', () => {
  test('should render correctly', () => {
    shallow(<DataProvider />);
  });
});

describe('tests about functions', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<DataProvider />);
    instance = wrapper.instance();
  });
  afterEach(cleanup);

  /**
   * Test if setEditor function really updates state.codeEditor correctly
   */
  test('should set editor correctly', () => {
    let testString = 'editor setted';
    instance.setEditor(testString);
    expect(wrapper.state('codeEditor')).toEqual(testString);
  });

  /**
   * Test if getJSONArray returns correctly if codeeditor is setted
   */
  test('should generate correct JSON array if codeEditor is correct', () => {
    wrapper.setState({codeEditor: global.correctEditorCode});    
    expect(instance.getJSONArray()).toEqual(global.exampleJsonArray);
  });

  /**
   * Test if getJSONArray return undefined if codeeditor undefined
   */
  test('should return undefined if codeEditor undefined', () => {
    expect(instance.getJSONArray()).toEqual(undefined);
  });
});