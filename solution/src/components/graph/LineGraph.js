import React from 'react';
import { DATA_CONTEXT } from '../../context';
import BottomBar from '../bar/BottomBar';

export default class LineGraph extends React.Component {

  componentDidMount() {
    drawChart(undefined);
  }

  generateGraphClickCallback = () => {
    drawChart(this.context.getJSONArray());
  }

  render() {
    return (
      <React.Fragment>
        <div id="chartParent" className="w-100">
          <div id="linechart" />
        </div>
        <BottomBar callbackGenerateGraphClick = {this.generateGraphClickCallback} />
      </React.Fragment>
    );
  }


}

LineGraph.contextType = DATA_CONTEXT;

function drawChart(jsonArray) {
  const google = window.google;
  google.charts.load('current', { packages: ['corechart'] });

  let chartArray = undefined
  if(jsonArray) {
    chartArray = jsonArry2DataTableStruct(jsonArray);
  }

  google.charts.setOnLoadCallback(function () {    
    var data = new google.visualization.arrayToDataTable(chartArray);

    var chartWidth = document.getElementById('chartParent').width;
    var chartHeight = document.getElementById('chartParent').height;
    var options = {
      width: chartWidth,
      height: chartHeight,
      vAxis: { textPosition: 'none' },
      hAxis: { gridlines: { color: 'transparent' }, format: 'mm:ss' },
      pointsVisible: true
    };

    var chart = new google.visualization.LineChart(document.getElementById('linechart'));

    chart.draw(data, options);
  });
}

function jsonArry2DataTableStruct(jsonArr) {
  let rows = jsonArray2OrganizedArray(jsonArr);
  return convertOrganizedArray2ArrayDataTableStruct(rows);
}

function jsonArray2OrganizedArray(jsonArr) {
  let out = new Map();
  for(let i=0; i < jsonArr.length; i++) {
    let json = jsonArr[i];
    let type = json['type'];
    if(type == 'start') {
      out = new Map();
    }
    else if(type == 'span') {

    }
    else if(type == 'data') {
      let ts = json['timestamp'];
      if(out.has(ts)) {
        let aux = new Object();
        aux.pair = json['os'] + ' ' + json['browser'];
        aux.minVal = json['min_response_time'];
        aux.maxVal = json['max_response_time'];
        out.get(ts).push(aux);
      } else {
        let params = [];
        let aux = new Object();
        aux.pair = json['os'] + ' ' + json['browser'];
        aux.minVal = json['min_response_time'];
        aux.maxVal = json['max_response_time'];
        params.push(aux);
        out.set(ts, params);
      }
    }
  }
  return out;
}

function convertOrganizedArray2ArrayDataTableStruct(arr) {
  let out = [];
  let header = [];
  header.push('ts');
  arr = new Map([...arr.entries()].sort());
  for(let [key, value] of arr.entries()) {
    let aux = [];
    aux.push(new Date(parseInt(key)));
    for(let i=0; i < value.length; i++) {
      let minPair = value[i].pair + ' min';
      if(!header.includes(minPair)) header.push(minPair);
      let maxPair = value[i].pair + ' max';
      if(!header.includes(maxPair)) header.push(maxPair);
      let minVal = new Date(value[i].minVal*1000);
      aux.push(minVal);      
      let maxVal = new Date(value[i].maxVal*1000);
      aux.push(maxVal);
    }
    out.push(aux);
  }
  let firstLine = []
  firstLine.push(header);
  return firstLine.concat(out);
}