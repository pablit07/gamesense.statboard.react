import "./teamCompareChart.css";
import * as d3 from "d3";
import Chart from "./Chart";

class TeamCompareChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height, textColor, quarstotal, quarstype, quarslocation}) {

  // radio buttons will choose later ...
  // For testing, set 0, 1 or 2 ...
  var selectedScore = 0 // this will be 0, 1, 2 as set by radio buttons
  var scoreTypes = ["location", "type", "total"];
  var scoreType = scoreTypes[selectedScore]; // 'location' for now

  console.log("-------------quarstotal---------------");
  console.log(quarstotal);
  console.log("-------------quarstype---------------");
  console.log(quarstype); 
  console.log("-------------quarslocation---------------");
  console.log(quarslocation);

  var data = this.props.values;
  console.log("============== And the values are ... ===========");
  console.log(data);

  // ToDo: Put this in a function in a different file ...
  // split up data into {first_name: "", last_name: "", score: "<relevant_score>"}
  // var locationData = [];
  // var typeData = [];
  // var totalData = [];

  var allData = this.props.values;
  
  // pop and store the "Team Average" - last element
  var bummer = allData.pop();
  console.log("----------- bummer teamAverages -------");
  console.log(bummer); // works fine, `bummer` exists, is not undefined
  // now try to get values from `bummer`
      // var lastName =  bummer.last_name   //expect "Average" 
      // console.log(lastName);  //ERROR TypeError: Cannot read property 'last_name' of undefined
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("----------- hard-coded teamAverages -------");
  //So, until above is fixed, hard-code the teamAverages
  var teamAverages = {
    first_name: "Team",
    last_name: "Average",
    first_glance_location_score: 341.11,
    first_glance_type_score: 325,
    first_glance_total_score: 776.94 };

  console.log(teamAverages);

  
  var locationData = [];
  for (let i = 0; i < allData.length; i += 1) {
    let tmp = {};
    for (let key in allData[i]) {
      if (key === "last_name") {
        tmp.first_name = allData[i].first_name;
      }
      if (key === "first_name") {
        tmp.last_name = allData[i].last_name;
      }
      if (key === "first_glance_location_score") {
        tmp.thisScore = allData[i].first_glance_location_score;
      }
    }
    locationData.push(tmp);
  }

  var typeData = [];
  for (let i = 0; i < allData.length; i += 1) {
    let tmp = {};
    for (let key in allData[i]) {
      if (key === "first_name") {
        tmp.first_name = allData[i].first_name;
      }
      if (key === "last_name") {
        tmp.last_name = allData[i].last_name;
        if (allData[i].last_name === "") {
          tmp.last_name = "unknown";
        }
      }
      if (key === "first_glance_type_score") {
        tmp.thisScore = allData[i].first_glance_type_score;
      }
    }
    typeData.push(tmp);
  }

  var totalData = [];
  for (let i = 0; i < allData.length; i += 1) {
    let tmp = {};
    for (let key in allData[i]) {
      if (key === "first_name") {
        tmp.first_name = allData[i].first_name;
      }
      if (key === "last_name") {
        tmp.last_name = allData[i].last_name;
      }
      if (key === "first_glance_total_score") {
        tmp.thisScore = allData[i].first_glance_total_score;
      }
    }
    totalData.push(tmp);
  }

  console.log("---------locationData---------");
  console.log(locationData);
  console.log("--------typeData----------");
  console.log(typeData);
  console.log("---------totalData---------");
  console.log(totalData);
  console.log("------------------");

  svg_width = svg_width || 625;
  svg_height = svg_height || 575;
  //set up chart
  var margin = { top: 15, right: 5, bottom: 35, left: 50 },
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom,
    axisTicks = { qty: 7 };

  var xScale = d3.scaleLinear().range([0, width*.8]);

  var yScale = d3
    .scaleBand()
    .range([height - margin.top - margin.bottom, 0])
    .padding(.08);

  var gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];

  var yAxis = d3.axisLeft(yScale).tickSizeOuter(axisTicks.outerSize);

  var xAxis = d3
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
      .attr("fill", "lightgray")
      .attr("opacity", 0.3);

  // chart group 'g'
  var chart = svg
    .attr("width", svg_width)
    .attr("height", svg_height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //add yAxis label (if desired)
  // chart
  //   .append("text")
  //   .attr("transform", "translate(15," +  (height+margin.bottom)/2 + ") rotate(-90)")
  //   .text("Player");

  // update with proper data ...
  changeData(scoreType);

  function changeData(value) {
    //function for toggling between data
    var locationAvg = teamAverages.first_glance_location_score;
    var typeAvg = teamAverages.first_glance_type_score;
    var totalAvg =  teamAverages.first_glance_total_score;
    console.log('//////////////////////////////////////////')
    console.log(locationAvg);

    if (value === "location") {
      update(locationData, locationAvg, quarslocation);// Avg is lame hard code, should come from popped value
    } else if (value === "type") {
      update(typeData, typeAvg, quarstype); 
    } else {
      update(totalData, totalAvg, quarstotal); 
    }
  }

  // Update chart with chosen data ////////////////////////////////////////////////////////
  function update(data, average, quartiles) {
    // get max and min score values for current data ...
    var scoreMax = d3.max(data, d => d.thisScore);
    var scoreMin = d3.min(data, d => d.thisScore);

    //set domain for the x axis
    xScale.domain([scoreMin * 0.95, scoreMax * 1.1]);

    //set domain for y axis
    yScale.domain(data.map(d => d.last_name)); // Y-value labels: Player's name

    const t = d3.transition().duration(500); 
    // transition time 500 ms.

	 //select all bars on the graph, remove them, call .exit() to clear previous data set. 
	 //then add/enter the new data set
    var bars = chart
      .selectAll("last_name")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "last_name")
      .attr("transform", `translate(${margin.left}, 0)`);
 
    /* Add score bars */
    // these are the Quartile Range colors. 
    var qColors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];

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
      .attr("y", function(d) {
                   return yScale(d.last_name);
                  }) 
      .attr("height", yScale.bandwidth())
      .attr("ry", "4")
      .transition(t)
          .attr("width", d => xScale(d.thisScore))

      // set the proper fillColor based on score in Quartile Range. 
      .style("fill", function(d) {
          if (d.thisScore <= quartiles.q1) {return qColors[0]}
          else if (d.thisScore <= quartiles.median){return qColors[1]}
          else if (d.thisScore <= quartiles.q3){return qColors[2]}
          else {return qColors[3]};
      })
      .style("stroke", "black")
      .style("stroke-width", 0.7)
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
    var scoreVal = xScale(average);

    var line = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`);

    line
      .append("line")
      .style("stroke", "#116979")
      .style("stroke-width", 8)
      .style("stroke-dasharray", "20, 3")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height - margin.bottom - margin.top)
      .attr("opacity", 0)
      .transition(t)
        .delay(650)
        .ease(d3.easeBounce)
        .attr("x1", scoreVal)
        .attr("x2", scoreVal)
        .attr("opacity", 1);

    // Average Line Label
    line
      .append("text")
      .attr("class", "averageLabel")
      .attr("text-anchor", "none")
      .attr("x", 10)
      .attr("y", yScale.bandwidth() / 2)
      .text("Average "+ average + " (" + scoreType + " score)")
      .attr("opacity", 0)
      .transition(t)
        .delay(400)
        .attr("x", scoreVal + 10)
        .attr("opacity", 1);
    } //end update    ///////////////////////////////////////////////////////////
  }
}
export default TeamCompareChart;
