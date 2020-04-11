import * as d3 from "d3";
import Chart from "./Chart";

class LocVsTypeChart extends Chart {
  addChartLayer({svg, values, typAvg, locAvg, svg_width, svg_height}) {
    console.log("============= values ==================================");
    console.log(values);
    svg_height = svg_height || 400;
    svg_width = svg_width || 600;  

    // set the dimensions and margins of the graph
   const margin = {top: 15, right: 15, bottom: 50, left: 55},
         width = svg_width - margin.left - margin.right,
         height = svg_height - margin.top - margin.bottom;

  const axisTicks = {qty: 12, outerSize: 2};      

      
    // draw the svg border for reference
    let svgBorder = svg.append("rect")
        .append("g")
    svgBorder
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", svg_height)
      .attr("width", svg_width)
      .style("stroke", "green")
      .style("fill", "none")
      .style("stroke-width", 1)
      // .style("stroke-dasharray", "10, 4"); 
      
    console.log("--------- svg_width -----")
    console.log(svg_width );
    console.log("--------- svg_height -----")
    console.log(svg_height);

    console.log("--------- width -----")
    console.log(width );
    console.log("--------- height -----")
    console.log(height);

    // get max and min score values for current data ...
    let scoreMaxL = d3.max(values, d => d.first_glance_location_score);
    let scoreMinL = d3.min(values, d => d.first_glance_location_score);

    let scoreMaxT = d3.max(values, d => d.first_glance_type_score);
    let scoreMinT = d3.min(values, d => d.first_glance_type_score);
    
    console.log("--------- scoreMinL -----")
    console.log(scoreMinL);
    console.log("--------- scoreMaxL -----")
    console.log(scoreMaxL);
    console.log("--------- scoreMinT -----")
    console.log(scoreMinT);
    console.log("--------- scoreMaxT -----")
    console.log(scoreMaxT);  
    

 ///////////////////////////////////////////////////////////////

    // chart group 'g'
    const chart = svg     // line 8
      .attr("width", svg_width)
      .attr("height", svg_height)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      // add X axis
      let xScale = d3.scaleLinear()
        .range([0, width])
        .domain([scoreMinL, scoreMaxL]); 
      chart.append("g")
        .attr(
          "transform", 
          `translate(0, ${height})`
        ) 
        .call(d3.axisBottom(xScale));
         
      // Add Y axis
      let yScale = d3.scaleLinear()
        .domain([scoreMinT, scoreMaxT])
        .range([height, 0]);
      chart.append("g") 
        .call(d3.axisLeft(yScale));

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
    //  let locationMid = margin.left + xScale(scoreMinL + ((scoreMinL + scoreMaxL)/2));
     let locationMid = xScale((scoreMinL + scoreMaxL)/2);
     let typeMid = yScale((scoreMinT + scoreMaxT)/2);

     //Vertical  mid line
     let lineMidLoc = chart
       .append("g")
     lineMidLoc
       .append("line")
         .style("stroke-width", 4)
         // .style("stroke-dasharray", "22, 4")
         .style("stroke", "4")
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
           // .style("stroke-dasharray", "22, 4")
           .style("stroke", "4")
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
           .style("stroke", "4")
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
           .style("font-size",  "10px")
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
        .style("stroke", "4")
        .attr("x1", lAvg)
        .attr("y1", height)
        .attr("x2", lAvg)
        .attr("y2", -4)
        .attr("opacity", .8)

      let  locAvgLabel = chart
        .append("text")
      if (values.length) {
      locAvgLabel  
        .attr("class", "locAvgLabel")
        .attr("text-anchor", "right")
        .attr("x", lAvg)
        .attr("y", -8)
        .text("Average " + locAvg + " (Location Score)")
        .style("font-size",  "10px")
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


      // Add the Type/Location data dots ...
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
          .attr("opacity", .925);   
          
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
