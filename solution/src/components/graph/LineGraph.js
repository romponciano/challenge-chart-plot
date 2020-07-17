import React from 'react';
import { DATA_CONTEXT } from '../../context';
import BottomBar from '../bar/BottomBar';

export default class LineGraph extends React.Component {

  componentDidMount() {
    drawChart(undefined);
  }

  generateGraphClickCallback = () => {
    drawChart(this.context.getCodeMirror());
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

function drawChart(codeMirror) {
  const google = window.google;
  google.charts.load('current', { packages: ['corechart'] });

  let chartArray = undefined
  if(codeMirror) {
    chartArray = jsonArry2DataTable(codeMirror2JsonArray(codeMirror));
  }

  google.charts.setOnLoadCallback(function () {    
    //var data = new google.visualization.arrayToDataTable([
    //  ['x', 'y1', 'y2', 'y3', 'y4'],
    //  [new Date(parseInt('1519862400000')), new Date(0.1 * 1000), new Date(0.2 * 1000), new Date(0.3 * 1000), new Date(0.1 * 1000)],
    //  [new Date(parseInt('1519862460000')), new Date(0.2 * 1000), new Date(0.1 * 1000), new Date(0.2 * 1000), new Date(0.3 * 1000)],
    //]);

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

function codeMirror2JsonArray(codeMirror) {
  let typeString = 'type';
  let timestampString = 'timestamp';
  let selectString = 'select';
  let groupString = 'group';
  let beginString = 'begin';
  let endString = 'end';
  let osString = 'os';
  let browserString = 'browser';
  let minString = 'min_response_time';
  let maxString = 'max_response_time';

  let jsonArr = []

  codeMirror.eachLine(line => {
    let txt = line.text;
    txt = txt.replace(/\s/g,'');

    txt = txt.replace(typeString+":", '"'+typeString+'":');
    txt = txt.replace(timestampString+":", '"'+timestampString+'":');

    if(txt.includes('start')) {
      txt = txt.replace(selectString+":", '"'+selectString+'":');
      txt = txt.replace(groupString+":", '"'+groupString+'":');
    }
    else if(txt.includes('span')) {
      txt = txt.replace(beginString+":", '"'+beginString+'":');
      txt = txt.replace(endString+":", '"'+endString+'":');
    }
    else if(txt.includes('data')) {  
      txt = txt.replace(osString+":", '"'+osString+'":');
      txt = txt.replace(browserString+":", '"'+browserString+'":');
      txt = txt.replace(minString+":", '"'+minString+'":');
      txt = txt.replace(maxString+":", '"'+maxString+'":');      
    }

    txt = txt.replace(/\'/g, '"');
    if(txt && txt.length > 0) {
      jsonArr.push(JSON.parse(txt));
    }
  })
  
  return jsonArr;
}

function jsonArry2DataTable(jsonArr) {

  let rows = new Map();
  for(let i=0; i < jsonArr.length; i++) {
    let json = jsonArr[i];
    let type = json['type'];
    if(type == 'start') {
      rows = new Map();
    }
    else if(type == 'span') {

    }
    else if(type == 'data') {
      let ts = json['timestamp'];
      if(rows.has(ts)) {
        let aux = new Object();
        aux.pair = json['os'] + ' ' + json['browser'];
        aux.minVal = json['min_response_time'];
        aux.maxVal = json['max_response_time'];
        rows.get(ts).push(aux);
      } else {
        let params = [];
        let aux = new Object();
        aux.pair = json['os'] + ' ' + json['browser'];
        aux.minVal = json['min_response_time'];
        aux.maxVal = json['max_response_time'];
        params.push(aux);
        rows.set(ts, params);
      }
    }
  }

  let chartArr = [];
  let header = [];
  header.push('ts');
  rows = new Map([...rows.entries()].sort());
  for(let [key, value] of rows.entries()) {
    
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

    chartArr.push(aux);
  }

  let firstLine = []
  firstLine.push(header);
  chartArr = firstLine.concat(chartArr);

  console.log(chartArr);

  return chartArr;
}