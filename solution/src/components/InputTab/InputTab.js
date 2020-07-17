import React from 'react';
import InputUI from './InputUI';
import InputJSON from './InputJSON';

export default class InputTab extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link" id="json-tab" data-toggle="tab" href="#" role="tab" aria-controls="json-content" aria-selected="false"
              onClick={() => changeTab('ui', 'json')}
            >Via JSON</a>
            <a class="nav-item nav-link active" id="ui-tab" data-toggle="tab" href="#" role="tab" aria-controls="ui-content" aria-selected="true"
              onClick={() => changeTab('json', 'ui')}
            >Via UI</a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade" id="json-content" role="tabpanel" aria-labelledby="nav-json-tab"><InputJSON></InputJSON></div>
          <div class="tab-pane fade show active" id="ui-content" role="tabpanel" aria-labelledby="nav-ui-tab"><InputUI></InputUI></div>
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Function to change tab changing its properties
 * @param {*} desactiveTabId id of tab that must be desactived
 * @param {*} activeTabId  id of tab that must be actived
 */
function changeTab(desactiveTabId, activeTabId) {
  // change tab
  changeTabState(document.getElementById(desactiveTabId + '-tab'), false);
  changeTabState(document.getElementById(activeTabId + '-tab'), true);
  // change tab-content
  document.getElementById(desactiveTabId + '-content').classList.remove('show', 'active');
  document.getElementById(activeTabId + '-content').classList.add('show', 'active');
}

/**
 * Function to change tab state adding and removing 
 * 'active' class and changing aria-expanded state
 * @param {*} el element to be changed
 * @param {*} active if element must be active or not
 */
function changeTabState(el, active) {
  if (active) {
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }
  el.setAttribute('aria-expanded', active);
}