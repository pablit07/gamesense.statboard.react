
import * as d3 from "d3";
import Chart from "./Chart";

class TeamPlayerDrillsChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height, curWeekNum, curMonthNum, curYearNum}) {
    
  if (values.length) {
    console.log("------ values in chart ------");
    console.log("### curWeekNum ----> " + curWeekNum);
    console.log("### curMonthNum ----> " + curMonthNum);
    console.log("### curYearNum ----> " + curYearNum);
    console.log(values);
  }   

  const monthMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

  svg_width = svg_width || 525;
  svg_height = svg_height || 525;
  //set up chart
  let margin = { left: 20, right: 28, top: 30, bottom: 75, },
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    axisTicks = {qty: 7, outerSize: 0};

  let yScale = d3.scaleLinear().range([0, height]);

  let xScale = d3
    .scaleBand()
    .range([width - margin.left- margin.right, 0])
    .padding(.125);

  let yAxis = d3
      .axisLeft(yScale)
      .tickSizeOuter(axisTicks.outerSize)
      .tickSizeInner(2)
      .ticks(axisTicks.qty);

  let xAxis = d3
    .axisBottom(xScale)
    .tickSizeOuter(axisTicks.outerSize)
    .tickFormat((d, i) => values[i].player_last_name );

  // chart group 'g'
  const chart = svg
    .attr("width", svg_width)
    .attr("height", svg_height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


    // Update chart with chosen data ////////////////////////////////////////////////////////
    // get max and min score values for current data ...
    let scoreMax = d3.max(values, d => d.count);
    let scoreMin = d3.min(values, d => d.count);

    let average = d3.mean(values, d => d.count);
    average = d3.format(",.2f")(average);

    //set domain for the x axis
    yScale.domain([scoreMax * 1.05, scoreMin * .95]);

    //set domain for x axis
    xScale.domain(d3.range(values.length)); // X-value labels: Player's name

    const t = d3.transition().duration(700);     // transition time 500 ms.


	 //select all bars on the graph, remove them, call .exit() to clear previous data set.
	 //then add/enter the new data set
    let bars = chart
      .selectAll("player_last_name")
      .data(values)
      .enter()
        .append("g")
        .attr("class", "player_last_name")
        .attr("transform", `translate(${margin.left}, 0)`);
 
    /* Add score bars */
    bars
      .selectAll(".bar")
          .remove()
          .exit()
          .data(d => [d])
    //now give each 'bar' a rectangle the corresponding data 
      .enter()
      .append("rect")
        .attr("class", "bar")
        
        .attr("height", d => 0)
        .attr("x", d => xScale(d.index))
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .transition(t)
            .attr("height", d => (height - yScale(d.count)))
            .attr("y", d => yScale(d.count))
            
      // fill color for bar prelim ... 
       .style("fill", "dodgerblue" )
      .attr("opacity", 1.0);

    let line = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`);

    if (values.length) {  
      // Average Line
      let scaledAverage = yScale(average);
      line
        .append("line")
        .style("stroke-width", 4)
        .style("stroke-dasharray", "22, 4")
        // .style("stroke", "#1c94aa")
        .style("stroke", "#c91f05")
        .attr("x1", 0)
        .attr("y1", height)
        .attr("y2", height)
        .attr("x2", width - margin.left - margin.right)
        .attr("opacity", 0)
        .transition()
          .delay(800)
          .duration(850)
          .attr("y1", scaledAverage)
          .attr("y2", scaledAverage)
          .attr("opacity", 1);

        // average label
        line
          .append("text")
          .attr("class", "averageLabel")
      
          .attr("y", height)
          .attr("x", width - margin.right - 23)
          .text("Average")
          .style("font-size",  "14px")
          .style("fill", "#610e01")
          .attr("opacity", 0)
          .transition()
            .delay(800)
            .duration(850)
              .attr("opacity", 1)
            .attr("y", scaledAverage - 10);

        line
          .append("text")
          .attr("class", "averageLabel")
          .attr("text-anchor", "none")
          .attr("y", height)
          .attr("x", width - margin.right - 10)
          .text(average)
          .style("font-size",  "14px")
          .style("fill", "#610e01")
          .attr("opacity", 0)
          .transition()
            .delay(800)
            .duration(850)
            .attr("opacity", 1)
            .attr("y", scaledAverage +5 );  
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
        .attr("class", "player_last_name")
        .attr("transform", `translate(${margin.left}, 0)`);

    labels
      .selectAll("label")
          .remove()
          .exit()
          .data(values)
      .enter()
        .append("text")
        .style("font-size",  "14px")
        .text(d => d.count)
        .attr("x", function(d,i){
          return (xScale(i) + (xScale.bandwidth() / 2));
        })
        //  .attr("y",  yScale(average))
        // .attr("y", d => yScale(d.count+.1))
        .attr("y", d => height)
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "10px")
        .attr("fill" , "black")
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
        .transition(t)
          .attr("opacity", 1)
          .attr("y", d => yScale(d.count+.25));


    // Add the X Axis
    chart
      .append("g")
      .attr("class", "xAxisTC")
      .attr(
        "transform",
        `translate(${margin.left},${height})`
      )
      .call(xAxis)
      // rotate labels (player's names)
      .selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", ".8em")
                .attr("dy", ".25em")
                .attr("transform", function (d) {
                return "rotate(45)";
            });

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
      // .text( " Player") // There is no room for this
      .style("font-size",  "12px")
      .style("fill", "black");

   //add Period Labels per timeSeries
   let message;
   if (curWeekNum){
      message = "Displaying all data from: Week " +curWeekNum+ " of "+curYearNum;
   } 
   if (curMonthNum) {
      message = "Displaying all data from: " +monthMap[curMonthNum]+ " of "+curYearNum;
   } 
   if (!curWeekNum && !curMonthNum && curYearNum) {
    message = "Displaying all data from: " + curYearNum;
 } 


    chart
        .append("text")
        .attr("transform", `translate(${40}, ${-5})`)
        // .text( "Year " + curYearNum)
        .text(message)
        .style("font-size",  "15px")
        .style("font-style", "italic")
        .style("fill", "black");  
   
   //add yAxis label 
    chart
      .append("text")
      .attr("transform", "translate(-5," +  (height+margin.bottom)/2 + ") rotate(-90)")
      .text("Drills Completed");
    }
  }
export default TeamPlayerDrillsChart;
