import * as d3 from "d3";
import Chart from "./Chart";

class LocVsTypeChart extends Chart {
  addChartLayer({svg, values, typAvg, locAvg, svg_width, svg_height, svg_border_opacity}) {
    console.log("============= values ==================================");
    console.log(values);

    svg_height = svg_height || 400;
    svg_width = svg_width || 600;  
    svg_border_opacity = svg_border_opacity || 0;
    svg_border_opacity =0;

  // set the dimensions and margins of the graph
   const margin = {top: 15, right: 15, bottom: 50, left: 55},
  //  const margin = {top: 90, right: 130, bottom: 100, left: 110},
         width = svg_width - margin.left - margin.right,
         height = svg_height - margin.top - margin.bottom;

  const axisTicks = {qty: 12, outerSize: 0};  
  const dataPad = 35;   // amount to pad to min/max beyond actual data for charting   

    //draw the svg border for reference
    const svgBorder = svg     // line 8
      .attr("width", svg_width)
      .attr("height", svg_height)
      .append("g");
    svgBorder
    .append("rect")         
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", svg_height)
        .attr("width", svg_width)
        .style("stroke", "green")
        .style("fill", "none")
        .style("stroke-width", 1)
        .style("opacity", svg_border_opacity )


    // get max and min score values for current data ...
    let scoreMaxL = d3.max(values, d => d.first_glance_location_score);
    let scoreMinL = d3.min(values, d => d.first_glance_location_score);

    let scoreMaxT = d3.max(values, d => d.first_glance_type_score);
    let scoreMinT = d3.min(values, d => d.first_glance_type_score);

    let tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // create the tooltip
    tooltip 
       .attr("class", "tooltip")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("width", "75px")
        .style("height", "28px")
        .style("padding", "2px")
        .style("font", "8px sans-serif")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "6px")
        .style("pointer-events", "none");
 ///////////////////////////////////////////////////////////////

    // chart group 'g'
    const chart = svg     // line 8
      .attr("width", svg_width)
      .attr("height", svg_height)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");  
         
      // Define X and Y axes, call them near end.
      let yScale = d3.scaleLinear()
        .domain([scoreMinT-dataPad, scoreMaxT+dataPad])
        .range([height, 0]);

      let yAxis = d3
        .axisLeft(yScale)
        .tickSizeOuter(axisTicks.outerSize)
        .tickSizeInner(2); 

      // add X axis
      let xScale = d3.scaleLinear()
        .domain([scoreMinL-dataPad, scoreMaxL+dataPad])
        .range([0, width]); 
        
      let xAxis = d3
        // .attr({'stroke-width': '10px'})
        .axisBottom(xScale)
        .tickSizeOuter(axisTicks.outerSize)
        .tickSizeInner(2);  

      let tAvg = yScale(typAvg);   // first_glance_type_score: 325  
      let lAvg = xScale(locAvg);  // first_glance_location_score: 330

      function make_x_gridlines() {
        return d3.axisBottom(xScale)
          .ticks(axisTicks.qty)
      }
      function make_y_gridlines() {
        return d3.axisLeft(yScale)
          .ticks(axisTicks.qty)
      }
     
    // Add reference lines
     let locationMid = xScale((scoreMinL + scoreMaxL)/2);
     let typeMid = yScale((scoreMinT + scoreMaxT)/2);

     //Vertical  mid line
     let lineMidLoc = chart
       .append("g")
     lineMidLoc
       .append("line")
         .style("stroke-width", 4)
         .style("stroke","#cbd2d2")
         .attr("x1", locationMid)
         .attr("y1", 0)
         .attr("x2", locationMid)
         .attr("y2", height)
         .attr("opacity", .8);

      // Add vertical grid lines
      chart
        .append("g")
          .attr("class","grid")
          .attr("transform","translate(0," + height + ")")
          .style("stroke-dasharray",("3,3"))
          .call(make_x_gridlines()
                .tickSize(-height)
                .tickFormat("")
            )
      // Add horizontal grid lines
      chart
        .append ("g")
          .attr("class","grid")
          .style("stroke-dasharray",("3,3"))
          .call(make_y_gridlines()
                .tickSize(-width)
                .tickFormat("")
            )  

      //Horizontal mid line
      let lineMidType = chart
         .append("g")
        lineMidType
         .append("line")
           .style("stroke-width", 4)
           .style("stroke","#cbd2d2")
           .attr("x1", 0)
           .attr("y1", typeMid)
           .attr("x2", width)
           .attr("y2", typeMid)
           .attr("opacity", .8)

      //Horizontal (type score) Average line
      let lineAvgType = chart
         .append("g")
        lineAvgType
         .append("line")
           .style("stroke-width", 2)
           .style("stroke-dasharray", "14, 4")
           .style("stroke","#1c94aa")
           .attr("x1", 0)
           .attr("y1", tAvg)
           .attr("x2", width)
           .attr("y2", tAvg)
           .attr("opacity", .8)

     let  typeAvgLabel = chart
           .append("text")
      if (values.length) {
        typeAvgLabel  
           .attr("class", "locAvgLabel")
           .attr("text-anchor", "none")
           .attr("x", 5)
           .attr("y", tAvg-2)
           .text("Average " + typAvg + " (Type Score)")
           .style("font-size",  "8px")
           .style("fill", "#1c94aa");
        } else {
          typeAvgLabel
             .append("text")
             .attr("class", "rt-noData")
             .attr("y", (height / 2) - 50)
             .attr("x", (width / 2) - 100)
             .attr("dy", "1em")
             .attr("fill", "rgba(0,0,0,0.5)")
             .attr("style", "text-anchor: middle")
             .text("No Data To Display")
       }

      //Vertical (location score) Average line
      let lineAvgLoc = chart
      .append("g")
      lineAvgLoc
      .append("line")
        .style("stroke-width", 2)
        .style("stroke-dasharray", "14, 4")
        .style("stroke","#1c94aa")
        .attr("x1", lAvg)
        .attr("y1", height)
        .attr("x2", lAvg)
        .attr("y2", 0)
        .attr("opacity", .8)

      let  locAvgLabel = chart 
      if (values.length) {
        locAvgLabel  
          .append("text")
          .attr("class", "locAvgLabel")
          .attr("text-anchor", "none")
          .attr("x", 4)
          .attr("y", (-lAvg -4)) 
          .attr(
            "transform",
            `rotate(90)`
          ) 
          .text("Average " + locAvg + " (Location Score)")
          .style("font-size",  "8px")
          .style("fill", "#1c94aa");
      } else {
        locAvgLabel
          .append("text")
          .attr("class", "rt-noData")
          .attr("y", (height / 2) - 50)
          .attr("x", (width / 2) - 100)
          .attr("dy", "1em")
          .attr("fill", "rgba(0,0,0,0.5)")
          .attr("style", "text-anchor: middle")
          .text("No Data To Display")
      }

      // Now add yAxis   
      chart
        .append("g") 
        .call(yAxis)
        .selectAll("line,path")
            .style("stroke", "black")
            .style('stroke-width','.5');

      // and add xAxis   
      chart
        .append("g")
        .attr("class", "x axis")
        .attr(
          "transform", 
          `translate(0, ${height})`
        ) 
        .call(xAxis)
        .selectAll("line,path")
            .style("stroke", "black")
            .style('stroke-width','.5'); 

      //  Add top and right perimeter lines 
      let topLine = chart
         .append("g")
      topLine
         .append("line")
           .style("stroke-width", .5)
           .style("stroke","black")
           .attr("x1", 0)
           .attr("y1", yScale(scoreMaxT+dataPad))
           .attr("x2", width)
           .attr("y2", yScale(scoreMaxT+dataPad))
           .attr("opacity", .8)

      let rightLine = chart
        .append("g")
      rightLine
      .append("line")
        .style("stroke-width", .5)
        .style("stroke","black")
        .attr("x1", xScale(scoreMaxL+dataPad))
        .attr("y1", height)
        .attr("x2", xScale(scoreMaxL+dataPad))
        .attr("y2", 0)
      
      // Add the Type/Location dots with tooltips ...
      chart
      .append('g')
        .selectAll("dot")
        .data(values)
        .enter()
          .append("circle")
            .attr("cx", d => xScale(d.first_glance_location_score))
            .attr("cy", d => yScale(d.first_glance_type_score))
            .attr("r", 6)
            .style("fill", "#69b3a2")
            .attr("stroke", "#000")
            .attr("stroke-width", .5)
            .attr("opacity", .925)
            .on("mouseover", function(d) {
              tooltip.transition()
                .duration(100)
                .style("opacity", .9);
              tooltip.html((d.display_name) + "<br/> Type score: " + d.first_glance_type_score + "<br/> Location score: " + d.first_glance_location_score)
              // div.html(formatTime(d.date) + "<br/>" + d.close)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
              })
            .on("mouseout", function(d) {
              tooltip.transition()
                .duration(500)
                .style("opacity", 0);
              });
       
          
      // Add the Player's name to the dot ... 
      chart.selectAll("player")
        .data(values)
        .enter()
          .append("text")
          .attr("x", d => xScale(d.first_glance_location_score))
          .attr("y", d => yScale(d.first_glance_type_score)-7)
          .text(d => d.display_name)

          .style("font-size",  "8px")
          .style("text-anchor", "middle")
          .style("fill", "#000"); 

    //add yAxis label
    chart
      .append("text")
        .attr(
          "transform",
          `translate(-35, ${(height/2) } ) rotate(-90)`
        ) 
        .text("Type Score")
        .style("font-size",  "14px")
        .style("text-anchor", "middle")
        .style("fill", "#000");   

    //add xAxis label for Score Type
    chart
      .append("text")
        //  .attr("transform", "translate(" + width*.45 + "," + (height - 10) + ")")
        .attr(
          "transform",
          `translate(${width/2}, ${(height + 35) } )`
        ) 
        .text( "Location Score")
        .style("font-size",  "14px")
        .style("text-anchor", "middle")
        .style("fill", "#000");       
        
  }  
}
export default LocVsTypeChart;
