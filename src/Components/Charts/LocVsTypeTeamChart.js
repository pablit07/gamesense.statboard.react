import "./teamCompareChart.css";
import * as d3 from "d3";
import Chart from "./Chart";

class LocVsTypeTeamChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height}) {
  
  console.log("=============values ========================q==========");
  console.log(values);

  svg_width = svg_width || 625;
  svg_height = svg_height || 575;
  //set up chart
  let margin = { top: 45, right: 5, bottom: 20, left: 35},
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    axisTicks = {qty: 7, outerSize: 2};

  let xScale = d3.scaleLinear().range([0, width*.85]);

  let yScale = d3.scaleLinear().range([0, height*.85]);

  const gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];


  let xAxis = d3
    .axisBottom(xScale)
    .ticks(axisTicks.qty)
    .tickSizeOuter(axisTicks.outerSize);

  let yAxis = d3
    .axisLeft(yScale)
    .ticks(axisTicks.qty)
    .tickSizeOuter(axisTicks.outerSize);  

  // solid background for the chart
  svg
    .append("rect")
      .attr("x", 10)
      .attr("width", width)
      .attr("y", 30)
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
  

    // get max and min score values for current data ...
    let scoreMaxL = d3.max(values, d => d.first_glance_location_score);
    let scoreMinL = d3.min(values, d => d.first_glance_location_score);

    let scoreMaxT = d3.max(values, d => d.first_glance_type_score);
    let scoreMinT = d3.min(values, d => d.first_glance_type_score);

    //set domain for the x axis
    xScale.domain([scoreMinL * 0.95, scoreMaxT * 1.1]);

    //set domain for y axis
    yScale.domain([scoreMinT * 0.95, scoreMaxL * 1.1]);

    // these are the Quartile Range colors. 
    const qColors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];


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

    //add yAxis label (if desired)
    chart
      .append("text")
      .attr("transform", "translate(-2," +  (height+margin.bottom)/2 + ") rotate(-90)")
      .text("Type Score")
      .style("font-size",  "12px")
      .style("fill", "#fff");   

    //add xAxis label for Score Type
    chart
      .append("text")
      .attr("transform", "translate(" + svg_width*.35 + "," + (height - margin.bottom - 5) + ")")
      .text( "Location Score")
      .style("font-size",  "12px")
      .style("fill", "#fff");  
  

    chart.append('g')
    .selectAll("dot")
    .data(values)
    .enter()
    .append("circle")
      .attr("cx", d => xScale(d.first_glance_location_score))
      .attr("cy", d => height - yScale(d.first_glance_type_score))

      // .attr("height", d => this.state.height - y(d[pt])  - 50)
      // .attr("height", d => this.state.height - y(d[pt])  - 50)

      .attr("r", 10)
      .style("fill", "#69b3a2")

  }  
}
export default LocVsTypeTeamChart;
