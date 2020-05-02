import "./teamCompareChart.css";
import * as d3 from "d3";
import Chart from "./Chart";

class TeamCompareChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height, textColor, quartiles, average, scoreType}) {

  svg_width = svg_width || 625;
  svg_height = svg_height || 575;
  //set up chart
  let margin = { left: 45, right: 5, top: 30, bottom: 35, },
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    axisTicks = {qty: 7, outerSize: 2};

  let xScale = d3.scaleLinear().range([0, width*.85]);

  let yScale = d3
    .scaleBand()
    .range([height - margin.top - margin.bottom, 0])
    .padding(.125);

  const gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];

  let yAxis = d3
      .axisLeft(yScale)
      .tickSizeOuter(axisTicks.outerSize)
      .tickSizeInner(2)
      .tickFormat((d, i) => values[i].display_name);

  let xAxis = d3
    .axisBottom(xScale)
    .tickSizeOuter(axisTicks.outerSize)
    .ticks(axisTicks.qty);

  // solid background for the chart
  svg
    .append("rect")
      .attr("x", 10)
      .attr("width", svg_width )
      .attr("y", 0)
      .attr("height", height)
      .attr("fill", "white")
      .attr("opacity", .05);

  // chart group 'g'
  const chart = svg
    .attr("width", svg_width)
    .attr("height", svg_height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


    // Update chart with chosen data ////////////////////////////////////////////////////////
    // get max and min score values for current data ...
    let scoreMax = d3.max(values, d => d.thisScore);
    let scoreMin = d3.min(values, d => d.thisScore);

    //set domain for the x axis
    xScale.domain([scoreMin * 0.95, scoreMax * 1.05]);

    //set domain for y axis
    yScale.domain(d3.range(values.length)); // Y-value labels: Player's name

    const t = d3.transition().duration(500);     // transition time 500 ms.

    // these are the Quartile Range colors. 
    const qColors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];

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
        .attr("width", d => 0)
        .attr("y", d => yScale(d.index))
        .attr("height", yScale.bandwidth())
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

    // Average Line
    let scoreVal = xScale(average);
    let pushUpAveLine = 18;
    let line = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, -${pushUpAveLine})`);

      line
      .append("line")
      .style("stroke-width", 6)
      .style("stroke-dasharray", "22, 4")
      .style("stroke","#1c94aa")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height - margin.bottom - margin.top + pushUpAveLine)
      .attr("opacity", 0)
      .transition(t)
        .delay(650)
        // .ease(d3.easeBounce)
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
            .style("fill", "#115a68")
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

    // Add score labels to bars
    chart
    .append("g")
    .attr("class", "labels")

    let labels = chart
      .selectAll("labels")
      .data(values)
      .enter()
        .append("g")
        .attr("class", "last_name")
        .attr("transform", `translate(${margin.left}, 0)`);

    labels
      .selectAll("label")
          .remove()
          .exit()
          .data(values)
      .enter()
        .append("text")
        .text(d => d.thisScore)
        .attr("y", function(d,i){
          return (yScale(i) + (yScale.bandwidth() / 2)+2);
        })
         .attr("x",  xScale(average))
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "10px")
        .attr("fill" , "black")
        .attr("text-anchor", "right")
        .attr("opacity", 0)
        .transition()
         .duration(1000)
         .delay(1200)
          .attr("x", d => xScale(d.thisScore+3))
          .attr("opacity", 1);

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
    // chart
    //   .append("text")
    //   .attr("transform", "translate(-20," +  (height+margin.bottom)/2 + ") rotate(-90)")
    //   .text("Player");

    //add xAxis label for Score Type
    chart
      .append("text")
      .attr("transform", "translate(" + svg_width*.4 + "," + (height - margin.bottom) + ")")
      .text( " " + scoreType + " score")
      .style("font-size",  "12px")
      .style("fill", "black");
    }
}
export default TeamCompareChart;
