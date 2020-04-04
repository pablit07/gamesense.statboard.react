import "./teamCompareChart.css";
import * as d3 from "d3";
import Chart from "./Chart";

class TeamCompareChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height, textColor, quartiles, average, scoreType}) {

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
  let chart = svg
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

    const t = d3.transition().duration(500); 
    // transition time 500 ms.

	 //select all bars on the graph, remove them, call .exit() to clear previous data set.
	 //then add/enter the new data set
    let bars = chart
      .selectAll("last_name")
      .data(values)
      .enter()
      .append("g")
      .attr("class", "last_name")
      .attr("transform", `translate(${margin.left}, 0)`);
 
    /* Add score bars */
    // these are the Quartile Range colors. 
    const qColors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];

    bars
      .selectAll(".bar")
          .remove()
          .exit()
          .data(d => [d])
    //now give each rectangle the corresponding data and color
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("width", d => 0)
      .attr("y", d => yScale(d.index))
      .attr("height", yScale.bandwidth())
      //  .attr("ry", "2")
      .transition(t)
          .attr("width", d => xScale(d.thisScore))

      // set the proper fillColor based on score in Quartile Range. 
      .style("fill", function(d) {
          if (d.thisScore <= quartiles.q1) {return qColors[0]}
          else if (d.thisScore <= quartiles.median){return qColors[1]}
          else if (d.thisScore <= quartiles.q3){return qColors[2]}
          else {return qColors[3]}
      })
      // .style("stroke", "black")
      // .style("stroke-width", 1)
      .attr("opacity", 1.0);

    // TODO Add text to bars

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

    // Average Line
    let scoreVal = xScale(average);
    let pushUpAveLine = 18;
    let line = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, -${pushUpAveLine})`);

    
      line
      .append("line")
      .style("stroke", "#116979")
      .style("stroke-width", 6)
      .style("stroke-dasharray", "22, 4")
      .style("stroke","#c6e9f0")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height - margin.bottom - margin.top + pushUpAveLine)
      .attr("opacity", 0)
      .transition(t)
        .delay(650)
        .ease(d3.easeBounce)
        .attr("x1", scoreVal)
        .attr("x2", scoreVal)
        .attr("opacity", 1);

    // Average Line Label
    if (values.length) {
        line
            .append("text")
            .attr("class", "averageLabel")
            .attr("text-anchor", "none")
            .attr("x", 10)
            .attr("y", yScale.bandwidth() * .5)
            .text("Average " + average + " (" + scoreType + " score)")
            .style("font-size",  "15px")
            .style("fill", "#c6e9f0")
            .attr("opacity", 0)
            .transition(t)
              .delay(400)
              .attr("x", scoreVal + 10)
              .attr("opacity", 1);
      } else {
        line
            .append("text")
            .attr("class", "rt-noData")
            .attr("y", (svg_height / 2) - 50)
            .attr("x", (svg_width / 2) - 100)
            .attr("dy", "1em")
            .attr("fill", "rgba(0,0,0,0.5)")
            .attr("style", "text-anchor: middle")
            .text("No Data To Display")

      }
    }
}
export default TeamCompareChart;
