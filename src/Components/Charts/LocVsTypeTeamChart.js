import * as d3 from "d3";
import Chart from "./Chart";

class LocVsTypeTeamChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height}) {
    console.log("=============values ========================q==========");
    console.log(values);

    svg_width = svg_width || 625;  //700
    svg_height = svg_height || 575;  //500
    
    // draw the svg border for reference
    var svgBorder = svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", svg_height)
      .attr("width", svg_width)
      .style("stroke", "green")
      .style("fill", "none")
      .style("stroke-dasharray", "10, 4");
      // .style("stroke-width", 2);

    //// Chart Placement variables ...
    const scaleFactor = .95// 0-.95, percentage of SVG to make chart size
    const margin = { top: 15, 
                     left: 35, 
                     right: 5, 
                     bottom: 10 
                    }; // margins for chart inside svg

    let width = (svg_width - margin.left - margin.right) *.95 * scaleFactor,
        height = (svg_height - margin.top - margin.bottom) * .95 * scaleFactor;

      
    let axisTicks = {qty: 7, outerSize: 2};

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

    // solid background for the full svg ...
    chart
    .style("font", "14px")
    .style("color", "#00000")
    .append("g")
      .attr(
        "transform",
        `translate(0, 0)`
      )
      .append("rect")
        .attr("x", 0)
        .attr("width", width)
        .attr("y", 0)
        .attr("height", height)
        .attr("fill", "#2f4a6d")
        .attr("opacity", 0.0);

      // add X axis
      let xScale = d3.scaleLinear()
        .range([0, width * scaleFactor])
        .domain([scoreMinL, scoreMaxL]); 
      chart.append("g")
        .attr(
          "transform", 
          `translate(${margin.left}, ${(height * scaleFactor) + margin.top})`
        ) 
        .call(d3.axisBottom(xScale));
        // .ticks(axisTicks.qty)
        // .tickSizeOuter(axisTicks.outerSize);
         
      // Add Y axis
      let yScale = d3.scaleLinear()
        .domain([scoreMinT, scoreMaxT])
        .range([height * scaleFactor, 0]);
      chart.append("g")
        .attr(
          "transform", 
          `translate(${margin.left}, ${margin.top})`
        )  
        .call(d3.axisLeft(yScale));
     
    // Add reference lines
    //  let locationMid = margin.left + xScale(scoreMinL + ((scoreMinL + scoreMaxL)/2));
     let locationMid = margin.left + xScale((scoreMinL + scoreMaxL)/2);
     let typeMid = margin.top + yScale((scoreMinT + scoreMaxT)/2);

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
         .attr("y1", margin.top)
         .attr("x2", locationMid)
         .attr("y2", height - margin.bottom - margin.top)
         .attr("opacity", .8);

      //Horizontal mid line
      let lineMidType = chart
         .append("g")
        lineMidType
         .append("line")
           .style("stroke-width", 4)
           // .style("stroke-dasharray", "22, 4")
           .style("stroke", "4")
           .style("stroke","#cbd2d2")
           .attr("x1", margin.left)
           .attr("y1", typeMid)
           .attr("x2", width)
           .attr("y2", typeMid)
           .attr("opacity", .8);     

    // Add the dots ...
    chart
    .append('g')
      .selectAll("dot")
      .data(values)
      .enter()
      .append("circle")
        .attr("cx", d => margin.left + xScale(d.first_glance_location_score))
        .attr("cy", d => margin.top + yScale(d.first_glance_type_score))
        .attr("r", 8)
        .style("fill", "#69b3a2")
        .attr("stroke", "#000");


    //add yAxis label
    chart
      .append("text")
        .attr(
          "transform",
          `translate(${margin.left -15}, ${(height/2) +25 } ) rotate(-90)`
        ) 
        .text("Type Score")
        .style("font-size",  "14px")
        .style("fill", "#000");   

    //add xAxis label for Score Type
    chart
      .append("text")
        //  .attr("transform", "translate(" + width*.45 + "," + (height - 10) + ")")
        .attr(
          "transform",
          `translate(${width * .45}, ${(height - 10) } )`
        ) 
        .text( "Location Score")
        .style("font-size",  "14px")
        .style("fill", "#000");          
  }  
}
export default LocVsTypeTeamChart;
