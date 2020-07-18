import React from 'react';
import { DATA_CONTEXT } from '../../context';
import GraphControlBar from './GraphControlBar';
import { FIELD_TYPE, FIELD_TIMESTAMP, FIELD_OS, FIELD_BROWSER, FIELD_MIN, FIELD_MAX, TYPE_START, TYPE_SPAN, TYPE_DATA, LOADING_CHART, FIELD_BEGIN, FIELD_END, TYPE_STOP } from '../../Constants';
import { Chart } from 'react-google-charts';

export default class GraphView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: undefined
    }
  }

  componentDidMount() {
    this.setState(() => {
      return {
        chartData: getDataTableStruct(undefined)
      }
    });
  }

  /**
   * Method to execute when user click in generate graph button.
   * This method will get code editor text, convert it and
   * plot the new graph
   */
  generateGraphClickCallback = () => {
    this.setState(() => {
      return {
        chartData: getDataTableStruct(this.context.getJSONArray())
      }
    });
  }

  // If BottomBar button only exists to generate graph, then it
  // should be inside LineGraph component
  render() {
    return (
      <React.Fragment>
        <Chart
          chartType="LineChart"
          loader={<div>{LOADING_CHART}</div>}
          options={{
            chartArea: { left: "3%", top: "7%", right: "16%", width: "100%", height: "80%" },
            vAxis: { textPosition: 'none' },
            hAxis: { gridlines: { color: 'transparent' }, format: 'mm:ss' },
            pointsVisible: true,
            interpolateNulls: true
          }}
          data={this.state.chartData}
        />
        <GraphControlBar callbackGenerateGraphClick={this.generateGraphClickCallback} />
      </React.Fragment>
    );
  }

}

GraphView.contextType = DATA_CONTEXT;

/**
 * Method to draw the chart.
 * More info: https://developers.google.com/chart/interactive/docs/gallery/linechart
 */
export function getDataTableStruct(jsonArray) {
  // convert json array to chart struct array
  let chartArray = undefined;
  if (jsonArray) {
    chartArray = jsonArry2DataTableStruct(jsonArray);
  }
  // check if chartArray is invalid or if it have less than header+1
  if (!chartArray || chartArray.length < 2) {
    // wont work whithout it
    return [[{ f: 'Date', type: 'date' }, { f: 'Line', type: 'number' }]];
  }
  return chartArray;
}

/**
 * Function to convert JSON Array to DataTable Scrut.
 * This function only exists because the process takes 
 * 2 steps.
 * If rows == undefined, then return undefined to external
 * caller plot blank graph
 */
function jsonArry2DataTableStruct(jsonArr) {
  let rows = jsonArray2OrganizedArray(jsonArr);
  if(rows) {
    return convertOrganizedArray2ArrayDataTableStruct(rows);
  }
  return undefined;
}

/**
 * Convert JSON Array to a more readable array. It's
 * important in order to facilitate the conversion
 * to DataTable array struct.
 * All business logic related to the json code are here.
 */
function jsonArray2OrganizedArray(jsonArr) {
  let out = new Map();
  let begin, end = undefined;
  let instablePairs = [];
  let alreadyStop = false;
  for (let i = 0; i < jsonArr.length; i++) {
    let json = jsonArr[i];
    let type = json[FIELD_TYPE];
    // if find a new start, then reset all previous job
    if (type === TYPE_START) {
      out = new Map();
      instablePairs = [];
      begin = undefined;
      end = undefined;
      alreadyStop = false;
    }
    // if span and doest not have begin or end, then set values
    // else show error because span already defined for this start
    else if (type === TYPE_SPAN && !alreadyStop) {
      if(begin) {
        showError('Should not have two events of type SPAN to set begin');
        return undefined;
      }
      begin = json[FIELD_BEGIN];
      if(end) {
        showError('Should not have two events of type SPAN to set end');
        return undefined;
      }
      end = json[FIELD_END];
    }
    // if data, check if is valid and add value
    else if (type === TYPE_DATA && !alreadyStop) {
      let ts = json[FIELD_TIMESTAMP];
      if(!begin || !end) {
        showError('Should insert SPAN event with \'begin\' and \'end\', first of DATA event');
        return undefined;
      }
      // only add if timestamp between being and end
      // otherwise, just ignore (business logic decided it)
      if(ts >= begin && ts <= end) {
        if (out.has(ts)) {
          out.get(ts).push(generateDataObject(json));
        } else {
          let params = [];
          params.push(generateDataObject(json));
          out.set(ts, params);
        }
      }
      // if ts isn't between begin and end, then add this obj
      // to an array of instable pairs. This array will check (in the end)
      // the necessity to remove or not these objs from out;
      else {
        instablePairs.push(generateDataObject(json).pair);
      }
    } 
    // if stop type, then set control variable
    else if(type === TYPE_STOP) {
      alreadyStop = true;
    }
  }
  out.set(-1, instablePairs);
  return out;
}

/**
 * Function to show an alert box with some error msg
 * @param {string} msg 
 */
function showError(msg) {
  alert(msg);
}

/**
 * Create aux object used inside organized array
 */
function generateDataObject(json) {
  let aux = {
    pair: json[FIELD_OS] + ' ' + json[FIELD_BROWSER],
    minVal: json[FIELD_MIN],
    maxVal: json[FIELD_MAX]
  }
  return aux;
}

/**
 * Convert readable array to DataTable struct
 * https://developers.google.com/chart/interactive/docs/datatables_dataviews
 */
function convertOrganizedArray2ArrayDataTableStruct(arr) {
  let out = [];
  let header = [];
  let instablePairs = arr.get(-1); // get instable pais, if exists  
  arr.delete(-1); // delete instable pais after get it
  header.push('ts'); // add the x name
  arr = new Map([...arr.entries()].sort()); // order timestamps to get smaller first
  for (let [key, value] of arr.entries()) {
    let aux = [];
    aux.push(new Date(parseInt(key))); // add the x val
    // generate all other cols
    for (let i = 0; i < value.length; i++) {
      let val = value[i];
      // only add if doesn't exists in instablePairs
      if(!instablePairs.includes(val.pair)) {
        let minPair = val.pair + ' min';
        if (!header.includes(minPair)) header.push(minPair);
        let maxPair = val.pair + ' max';
        if (!header.includes(maxPair)) header.push(maxPair);
        let minVal = val.minVal;
        aux.push(minVal);
        let maxVal = val.maxVal;
        aux.push(maxVal);
      }
    }
    // only add if aux have some data (key doesn't count)
    if(aux.length > 1) out.push(aux);
  }
  // return DataTable struct array with header in the begin
  let firstLine = []
  firstLine.push(header);
  return firstLine.concat(out);
}