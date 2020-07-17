import React from 'react';

export default class LineGraph extends React.Component {

  componentDidMount() {
    drawChart();
  }

  render() {
    return (
        <div id="chartParent" className="w-100">
          <div id="linechart" />
        </div>
    );
  }


}

function drawChart() {
  const google = window.google;
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(function () {
    var data = new google.visualization.arrayToDataTable([
      ['x', 'y1', 'y2', 'y3', 'y4'],
      [new Date(parseInt('1519862400000')), new Date(0.1*1000), new Date(0.2*1000), new Date(0.3*1000), new Date(0.1*1000)], 
      [new Date(parseInt('1519862460000')), new Date(0.2*1000), new Date(0.1*1000), new Date(0.2*1000), new Date(0.3*1000)],
    ]);

    var chartWidth = document.getElementById('chartParent').width;
    var chartHeight = document.getElementById('chartParent').height;
    var options = {
      width: chartWidth,
      height: chartHeight,
      vAxis : { textPosition: 'none'},
      hAxis : { gridlines: { color: 'transparent'}, format: 'HH:mm' },
      pointsVisible: true
    };

    var chart = new google.visualization.LineChart(document.getElementById('linechart'));

    chart.draw(data, options);
  });
}