import React from 'react';
import { DATA_CONTEXT } from '../../context';
import GraphControlBar from './GraphControlBar';
import { FIELD_TYPE, FIELD_TIMESTAMP, FIELD_OS, FIELD_BROWSER, FIELD_MIN, FIELD_MAX, TYPE_START, TYPE_SPAN, TYPE_DATA, LOADING_CHART } from '../../Constants';
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
  if (!chartArray) {
    // wont work whithout this
    return [[{ f: 'Date', type: 'date' }, { f: 'Line', type: 'number' }]];
  }
  return chartArray;
}

/**
 * Function to convert JSON Array to DataTable Scrut.
 * This function only exists because the process takes 
 * 2 steps
 */
function jsonArry2DataTableStruct(jsonArr) {
  let rows = jsonArray2OrganizedArray(jsonArr);
  return convertOrganizedArray2ArrayDataTableStruct(rows);
}

/**
 * Convert JSON Array to a more readable array. It's
 * important in order to facilitate the conversion
 * to DataTable array struct
 */
function jsonArray2OrganizedArray(jsonArr) {
  let out = new Map();
  for (let i = 0; i < jsonArr.length; i++) {
    let json = jsonArr[i];
    let type = json[FIELD_TYPE];
    // if find a new start, then reset all previous job
    if (type === TYPE_START) {
      out = new Map();
    }
    else if (type === TYPE_SPAN) {

    }
    else if (type === TYPE_DATA) {
      let ts = json[FIELD_TIMESTAMP];
      if (out.has(ts)) {
        out.get(ts).push(generateDataObject(json));
      } else {
        let params = [];
        params.push(generateDataObject(json));
        out.set(ts, params);
      }
    }
  }
  return out;
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
  header.push('ts'); // add the x name
  arr = new Map([...arr.entries()].sort()); // order timestamps to get smaller first
  for (let [key, value] of arr.entries()) {
    let aux = [];
    aux.push(new Date(parseInt(key))); // add the x val
    // generate all other cols
    for (let i = 0; i < value.length; i++) {
      let minPair = value[i].pair + ' min';
      if (!header.includes(minPair)) header.push(minPair);
      let maxPair = value[i].pair + ' max';
      if (!header.includes(maxPair)) header.push(maxPair);
      let minVal = (value[i].minVal);
      aux.push(minVal);
      let maxVal = (value[i].maxVal);
      aux.push(maxVal);
    }
    out.push(aux); // add line to out
  }
  // return DataTable struct array with header in the begin
  let firstLine = []
  firstLine.push(header);
  return firstLine.concat(out);
}