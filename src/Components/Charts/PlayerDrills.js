
import * as d3 from "d3";
import Chart from "./Chart";

class PlayerDrills extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height, textColor, quartiles, average, scoreType}) {

  console.log("------------ values -----------");
  console.log(values);


  svg_width = svg_width || 625;
  svg_height = svg_height || 575;
  //set up chart
  let margin = { left: 45, right: 5, top: 30, bottom: 35, },
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    axisTicks = {qty: 7, outerSize: 0};

  let yScale = d3.scaleLinear().range([0, height]);

  let xScale = d3
    .scaleBand()
    .range([width - margin.left- margin.right, 0])
    .padding(.125);

  const gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];

  let yAxis = d3
      .axisLeft(yScale)
      .tickSizeOuter(axisTicks.outerSize)
      .tickSizeInner(2)
      .ticks(axisTicks.qty);

  let xAxis = d3
    .axisBottom(xScale)
    .tickSizeOuter(axisTicks.outerSize)
    .tickFormat((d, i) => values[i].display_name);


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

    console.log("-------------------------- xxx---");
    console.log(scoreMax);

    //set domain for the x axis
    yScale.domain([scoreMax * 1.05, scoreMin * .95]);

    //set domain for y axis
    xScale.domain(d3.range(values.length)); // X-value labels: Player's name

    const t = d3.transition().duration(200);     // transition time 500 ms.

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
        
        .attr("height", d => 0)
        .attr("x", d => xScale(d.index))
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .transition(t)
            .attr("height", d => (height - yScale(d.thisScore)))
            .attr("y", d => yScale(d.thisScore))
            

      // fill color for bar prelim ... 
      .style("fill", "70bf57" )
      .attr("opacity", 1.0);

    // Average Line
    let scoreVal = yScale(average);
    let line = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`);

      line
      .append("line")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "22, 4")
      .style("stroke","black")
      .attr("x1", 0)
      .attr("y1", scoreVal)
      .attr("y2", scoreVal)
      .attr("x2", width - margin.left - margin.right)
      .attr("opacity", 0)
      .transition(t)
        // .delay(700)

        .attr("opacity", 1);

    // Average Line Label
    if (values.length) {
        line
            .append("text")
            .attr("class", "averageLabel")
            .attr("text-anchor", "none")
            .attr("y", scoreVal - 10)
            .attr("x", width * .3)
            .text("Average Drills Completed: " + average + "")
            .style("font-size",  "15px")
            .style("fill", "clack")
            .attr("opacity", 0)
            .transition(t)
              // .delay(700)
              // .attr("y", scoreVal - 10)
              .attr("opacity", 1);
      } else {
        line
            .append("text")
            .attr("class", "rt-noData")
            .attr("x", (svg_width / 2) - 50)
            .attr("y", (svg_height / 2) - 100)
            .attr("dx", "1em")
            .attr("fill", "rgba(0,0,0,0.5)")
            .attr("style", "text-anchor: middle")
            .text("No Data To Display")
      }  

    //Add score labels to bars
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
        .style("font-size",  "14px")
        .text(d => d.thisScore)
        .attr("x", function(d,i){
          return (xScale(i) + (xScale.bandwidth() / 2)+2);
        })
        //  .attr("y",  yScale(average))
         .attr("y", d => yScale(d.thisScore+3))
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "10px")
        .attr("fill" , "black")
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
        .transition()
         .duration(500)
        //  .delay(500)
          .attr("y", d => yScale(d.thisScore+3))
          .attr("opacity", 1);

    // Add the X Axis
    chart
      .append("g")
      .attr("class", "xAxisTC")
      .attr(
        "transform",
        `translate(${margin.left},${height})`
      )
      .call(xAxis);

    // Add the Y Axis
    chart
      .append("g")
      .attr("class", "yAxisTC")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    //add xAxis label for Score Type
    chart
      .append("text")
      .attr("transform", `translate(${svg_width*.4}, ${height+30})`)
      .text( " Player")
      .style("font-size",  "12px")
      .style("fill", "black");

   //add Period Label
    chart
        .append("text")
        .attr("transform", `translate(${svg_width*.5}, ${30})`)
        .text( "Week of April 6 - 12, 2020")
        .style("font-size",  "18px")
        .style("fill", "black");  
    }
    
}
export default PlayerDrills;
