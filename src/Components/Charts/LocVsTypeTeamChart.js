import "./teamCompareChart.css";
import * as d3 from "d3";
import Chart from "./Chart";

class LocVsTypeTeamChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height}) {

  svg_width = svg_width || 625;
  svg_height = svg_height || 575;
  //set up chart
  let margin = { top: 30, right: 5, bottom: 35, left: 50},
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    axisTicks = {qty: 7, outerSize: 0};

  let xScale = d3.scaleLinear().range([0, width*.8]);

  let yScale = d3
    .scaleBand()
    .range([height - margin.top - margin.bottom, 0])
    .padding(.2);

  const gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];

  let yAxis = d3.axisLeft(yScale)
      .tickSizeOuter(axisTicks.outerSize)
      .tickSizeInner(2)
      .tickFormat((d, i) => values[i].display_name);

  let xAxis = d3
    .axisBottom(xScale)
    .ticks(axisTicks.qty)
    .tickSizeOuter(axisTicks.outerSize);

  // solid background for the chart
  svg
    .append("rect")
      .attr("x", 10)
      .attr("width", width)
      .attr("y", 0)
      .attr("height", height)
      // .attr("fill", "lightgray")
      .attr("fill", "#2f4a6d")
      .attr("opacity", 1);

  // chart group 'g'
  const chart = svg
    .attr("width", svg_width)
    .attr("height", svg_height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //add yAxis label (if desired)
  // chart
  //   .append("text")
  //   .attr("transform", "translate(15," +  (height+margin.bottom)/2 + ") rotate(-90)")
  //   .text("Player");

  
    // Update chart with chosen data ////////////////////////////////////////////////////////
    // get max and min score values for current data ...
    let scoreMax = d3.max(values, d => d.thisScore);
    let scoreMin = d3.min(values, d => d.thisScore);

    //set domain for the x axis
    xScale.domain([scoreMin * 0.95, scoreMax * 1.1]);

    //set domain for y axis
    yScale.domain(d3.range(values.length)); // Y-value labels: Player's name

    // these are the Quartile Range colors. 
    const qColors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];

    let bars = chart
      .selectAll("last_name")
      .data(values)
      .enter()
        .append("g")
        .attr("class", "last_name")
        .attr("transform", `translate(${margin.left}, 0)`);
 
    /* Add score bars */
    bars
      .selectAll(".bar")
          .remove()
          .exit()
          .data(d => [d])
    //now give each 'bar' a rectangle the corresponding data and color
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.index))
        .attr("height", yScale.bandwidth())
        .attr("width", d => xScale(d.thisScore)) 

      // set the proper fillColor based on score in Quartile Range. 
      .style("fill", "plum")

    // Add the X Axis
    chart
      .append("g")
      .attr("class", "xAxisTC")
      .attr(
        "transform",
        `translate(${margin.left},${height - margin.top - margin.bottom})`
      )
      .call(xAxis);

    // Add the Y Axis
    chart
      .append("g")
      .attr("class", "yAxisTC")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);
    }
}
export default LocVsTypeTeamChart;
