import * as d3 from "d3";
import Chart from "./Chart";

class LocVsTypeTeamChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height}) {
    const gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];  
  
    console.log("=============values ========================q==========");
    console.log(values);

    svg_width = svg_width || 625;
    svg_height = svg_height || 575;
    
    let margin = { top: 45, right: 5, bottom: 20, left: 35},
      yAxisMargin = 70,
      width = svg_width - margin.left - margin.right,
      height = svg_height - margin.top - margin.bottom,
      axisTicks = {qty: 7, outerSize: 2};

    // Define scales ...
    let xScale = d3.scaleLinear()
        .range([0, width*.85]);

    let yScale = d3.scaleLinear()
        .range([height*.85, 0]);

    let xAxis = d3
      .axisBottom(xScale)
      .ticks(axisTicks.qty)
      .tickSizeOuter(axisTicks.outerSize);

    let yAxis = d3
      .axisLeft(yScale)
      .ticks(axisTicks.qty)
      .tickSizeOuter(axisTicks.outerSize);  

    // chart group 'g'
    const chart = svg
      .attr("width", svg_width)
      .attr("height", svg_height)
      // .append("g")
      //   .attr("transform", `translate(${margin.left},${margin.top})`);

    // get max and min score values for current data ...
    let scoreMaxL = d3.max(values, d => d.first_glance_location_score);
    let scoreMinL = d3.min(values, d => d.first_glance_location_score);

    let scoreMaxT = d3.max(values, d => d.first_glance_type_score);
    let scoreMinT = d3.min(values, d => d.first_glance_type_score);


    // these are the Quartile Range colors. 
    const qColors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];

      //set domain for the x axis
      xScale.domain([scoreMinL * 0.95, scoreMaxL ]);

      //set domain for y axis
      yScale.domain([scoreMinT, scoreMaxT * 0.85  ]);

    // solid background for the chart
    chart
    .append("g")
      .attr(
        "transform",
        `translate(10, 0)`
      )
      .append("rect")
        .attr("x", 0)
        .attr("width", width)
        .attr("y", 0)
        .attr("height", height)
        // .attr("fill", "lightgray")
        .attr("fill", "#2f4a6d")
        .attr("opacity", 1);  


    
    // Add the X Axis
    chart
        .style("font", "12px")
        .style("color", "#fff")
      .append("g")  
        .attr(
          "transform",
          `translate(${yAxisMargin}, ${height - margin.top})`
        )
        .call(xAxis);
        
    // Add the Y Axis
    chart
        .style("font", "12px")
        .style("color", "#fff")
        .append("g")
        .attr(
          "transform",
          `translate(${yAxisMargin}, ${margin.bottom})`
        )
          .call(yAxis);

    //add yAxis label
    chart
      .append("text")
        // .attr(
        //   "transform",
        //   `translate(-2, ${height + margin.bottom/2} ) rotate(-90)")`
        // ) 
        .attr(
          "transform",
          `translate(${margin.left -5}, ${(height/2) +25 } ) rotate(-90)`
        ) 
        .text("Type Score")
        .style("font-size",  "14px")
        .style("fill", "#fff");   

    //add xAxis label for Score Type
    chart
      .append("text")
        .attr("transform", "translate(" + svg_width*.45 + "," + (height - 10) + ")")
        .text( "Location Score")
        .style("font-size",  "12px")
        .style("fill", "#fff");  
  
    chart
        .append("circle")
        .attr("cx", xScale(220))
        .attr("cy", height-yScale(200))
        .attr("r", 5)
        .style("fill", "red")
        .attr("stroke", "black")
        .attr("transform", `translate(${margin.left},${margin.top})`); 

    // Add the dots ...
    chart
      .append('g')
        .selectAll("dot")
        .data(values)
        .enter()
        .append("circle")
          .attr("cx", d => xScale(d.first_glance_location_score))
          .attr("cy", d => height  - yScale(d.first_glance_type_score))
          .attr("r", 10)
          .style("fill", "#69b3a2")
          .attr("stroke", "black");

  
    

  }  
}
export default LocVsTypeTeamChart;
