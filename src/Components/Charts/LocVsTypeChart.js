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
  const dataPad = 25;   // Bumped this up for @Dave // amount to pad to min/max beyond actual data for charting   

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

    // let allScoresMax = Math.max(scoreMaxL, scoreMaxT);
    let allScoresMax = 560;  // Decided to go with the highest possible score for Max
    let allScoresMin = Math.min(scoreMinL, scoreMinT);

    console.log("----------------------->allScoresMax " + allScoresMax);
    console.log("----------------------->allScoresMin " + allScoresMin);

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

      // make a unified X, Y scale ... 
      let uniScaleY = d3.scaleLinear()
      .domain([allScoresMin-dataPad, allScoresMax+dataPad])
      .range([height, 0]);

      let uniScaleX = d3.scaleLinear()
      .domain([allScoresMin-dataPad, allScoresMax+dataPad])
      .range([0, width]);

         
      // Define X and Y axes, call them near end.
      let yScale = d3.scaleLinear()
        .domain([allScoresMin-dataPad, allScoresMax+dataPad])
        .range([height, 0]);

      let yAxis = d3
        .axisLeft(uniScaleY)
        .tickSizeOuter(axisTicks.outerSize)
        .tickSizeInner(2); 

      // add X axis
      let xScale = d3.scaleLinear()
        .domain([allScoresMin-dataPad, allScoresMax+dataPad])
        .range([0, width]); 
        
      let xAxis = d3
        // .attr({'stroke-width': '10px'})
        .axisBottom(uniScaleX)
        .tickSizeOuter(axisTicks.outerSize)
        .tickSizeInner(2);  

      let tAvg = uniScaleY(typAvg);   // first_glance_type_score: 325  
      let lAvg = uniScaleX(locAvg);  // first_glance_location_score: 330

      function make_x_gridlines() {
        return d3.axisBottom(uniScaleX)
          .ticks(axisTicks.qty)
      }
      function make_y_gridlines() {
        return d3.axisLeft(uniScaleY)
          .ticks(axisTicks.qty)
      }
     
    // Add reference lines
     let locationMid = uniScaleX((scoreMinL + scoreMaxL)/2);
     let typeMid = uniScaleY((scoreMinT + scoreMaxT)/2);


     let locOneThird = uniScaleX( (allScoresMax - allScoresMin)*(1/3)   + allScoresMin);
     let locTwoThirds = uniScaleX((allScoresMax - allScoresMin)*(2/3) + allScoresMin);

     let typeOneThird = uniScaleY( (allScoresMax - allScoresMin)*(1/3)   + allScoresMin);
     let typeTwoThirds = uniScaleY((allScoresMax - allScoresMin)*(2/3) + scoreMinT);
     

     console.log("----------------------->locOneThird " + locOneThird);
     console.log("----------------------->locTwoThirds " + locTwoThirds);
     console.log("----------------------->typeOneThird " + typeOneThird);
     console.log("----------------------->typeTwoThirds " + typeTwoThirds);
     
     
     //Vertical  mid line
    //  let lineMidLoc = chart
    //    .append("g")
    //  lineMidLoc
    //    .append("line")
    //      .style("stroke-width", 4)
    //      .style("stroke","lightgray")
    //      .attr("x1", locationMid)
    //      .attr("y1", 0)
    //      .attr("x2", locationMid)
    //      .attr("y2", height)
    //      .attr("opacity", .8);

    // //Horizontal Mid line
    //   let lineMidType = chart
    //     .append("g")
    //   lineMidType
    //     .append("line")
    //       .style("stroke-width", 6)
    //       .style("stroke","lightgray")  //#cbd2d2
    //       .attr("x1", 0)
    //       .attr("y1", typeMid)
    //       .attr("x2", width)
    //       .attr("y2", typeMid)
    //       .attr("opacity", .8)

    //Horizontal 1/3 line
    let typeOneThirdLine = chart
      .append("g")
      typeOneThirdLine
      .append("line")
        .style("stroke-width", 6)
        .style("stroke","lightgray")  //#cbd2d2
        .attr("x1", 0)
        .attr("y1", typeOneThird)
        .attr("x2", width)
        .attr("y2", typeOneThird)
        .attr("opacity", .4)

    //Horizontal 2/3 line
    let typeTwoThirdsLine = chart
      .append("g")
      typeTwoThirdsLine
      .append("line")
        .style("stroke-width", 6)
        .style("stroke","lightgray")  //#cbd2d2
        .attr("x1", 0)
        .attr("y1", typeTwoThirds)
        .attr("x2", width)
        .attr("y2", typeTwoThirds)
        .attr("opacity", .4)

//////////////////////////////////////////////
      //Vertical  1/3  line
    let locOneThirdLine = chart
       .append("g")
    locOneThirdLine
      .append("line")
        .style("stroke-width", 6)
        .style("stroke","lightgray")
        .attr("x1", locOneThird)
        .attr("y1", 0)
        .attr("x2", locOneThird)
        .attr("y2", height)
        .attr("opacity", .4);
      
        //Vertical 2/3 line
      let locTwoThirdsLine = chart
        .append("g")     
      locTwoThirdsLine
           .append("line")
             .style("stroke-width", 6)
             .style("stroke","lightgray")
             .attr("x1", locTwoThirds)
             .attr("y1", 0)
             .attr("x2", locTwoThirds)
             .attr("y2", height)
             .attr("opacity", .4);


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
           .text("Team Average " + typAvg + " (Pitch Type)")
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
          .text("Team Average " + locAvg + " (Pitch Location)")
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
           .attr("y1", uniScaleY(allScoresMax+dataPad))
           .attr("x2", width)
           .attr("y2", uniScaleY(allScoresMax+dataPad))
           .attr("opacity", .8)

      let rightLine = chart
        .append("g")
      rightLine
      .append("line")
        .style("stroke-width", .5)
        .style("stroke","black")
        .attr("x1", uniScaleX(allScoresMax+dataPad))
        .attr("y1", height)
        .attr("x2", uniScaleX(allScoresMax+dataPad))
        .attr("y2", 0)
      
      // Add the Type/Location dots with tooltips ...
      chart
      .append('g')
        .selectAll("dot")
        .data(values)
        .enter()
          .append("circle")
            .attr("cx", d => uniScaleX(d.first_glance_location_score))
            .attr("cy", d => uniScaleY(d.first_glance_type_score))
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
          .attr("x", d => uniScaleX(d.first_glance_location_score))
          .attr("y", d => uniScaleY(d.first_glance_type_score)-7)
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
        .text("Pitch Type")
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
        .text( "Location")
        .style("font-size",  "14px")
        .style("text-anchor", "middle")
        .style("fill", "#000");       
        
  }  
}
export default LocVsTypeChart;
