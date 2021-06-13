import React from "react";
import * as d3 from "d3";

const Chart = (props) => (
  <div style={{ margin: "15px" }}>
    <svg width={props.width} height={props.height}>
      {props.children}
    </svg>
  </div>
);

const Bar = (props) => (
  <rect
    style={{ padding: "0 10px" }}
    fill={props.color}
    width={50}
    height={props.height || 0}
    x={props.offset || 0}
    y={props.availableHeight - (props.height || 0)}
  />
);

const DataSeries = (props) => {
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(props.data)])
    .range([0, props.height]);

  let xScale = d3
    .scaleLinear()
    .domain([0, d3.range(props.data.length)])
    .range([props.width]);

  let bars = props.data.map((item, index) => {
    return (
      <>
        <Bar
          height={yScale(item)}
          width={xScale.range()}
          offset={index * 90}
          availableHeight={props.height}
          color={props.color}
          key={index}
        />
        <text
          textAnchor="middle"
          x={index * 90 === 0 ? 25 : index * 90 + 25}
          y={yScale(item)}
        >
          {item}
        </text>
      </>
    );
  });
  return <g>{bars}</g>;
};
const BarChartComponent = ({ data, time }) => (
  <div style={{ margin: "15px" }}>
    <strong style={{ textAlign: "center" }}>
      Speed history of ship at: {time}{" "}
    </strong>
    <Chart width={1500} height={300}>
      <DataSeries data={data} width={600} height={300} color="cornflowerblue" />
    </Chart>
  </div>
);

export default BarChartComponent;
