import "./teamCompareChart.css";
import * as d3 from "d3";
import Chart from "./Chart";
// import test_data from "./test_data";

class TeamCompareChart extends Chart {
  addChartLayer({ svg, values, svg_width, svg_height, textColor, quarsTotal, quarsType, quarsLocation}) {

  // radio buttons will choose later ...
  // For testing, set 0, 1 or 2 ...
  var selectedScore = 1 // this will be 0, 1, 2 as set by radio buttons
  var scoreTypes = ["location", "type", "total"];
  var scoreType = scoreTypes[selectedScore]; // 'location' for now

  console.log("-------------quarsTotal---------------");
  console.log(quarsTotal);
  console.log("-------------quarsType---------------");
  console.log(quarsType); 
  console.log("-------------quarsLocation---------------");
  console.log(quarsLocation);

  var data = this.props.values;
  console.log("============== And the values are ... ===========");
  console.log(data);


  // ToDo: Put this in a function in a different file ...
  // split up data into {first_name: "", last_name: "", score: "<relevant_score>"}
  // var locationData = [];
  // var typeData = [];
  // var totalData = [];

  var allData = data;
  // pop and store the "Team Average" - last element

  var allAverages = allData.pop();

  console.log(allAverages);
  console.log ('---------------===============');

  //console.log(allAverages["first_name"]);
  // var totalAvg = allAverages.first_glance_total_score;
  // var locationAvg = allAverages.first_glance_location_score;
  // var typeAvg = allAverages.first_glance_type_score;

  console.log("---------allAverages---------");
  console.log(allAverages);
  let avgScores = {};
  for (let key in allAverages){
    console.log(key);
  }



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
    axisTicks = { qty: 11 };

  var xScale = d3.scaleLinear().range([0, width*.8]);

  var yScale = d3
    .scaleBand()
    .range([height - margin.top - margin.bottom, 0])
    .padding(.08);

  var gameSenseColors = ["#505252","#94a4a5","#ffffff","#70bf57","#0db688","#eae34c"];

  var quartileColors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];

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
    // .attr("fill", "#dee3e2")
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
    // TODO - LAME!: get this from data!!
    var averages = {locationAvg: 341.11, typeAvg: 325, totalAvg: 776.94};
    var locationAvg = 341.11;
    var typeAvg = 325;
    var totalAvg =  776.94;

    if (value === "location") {
      update(locationData, locationAvg);//Lame hard code, should come from popped value
    } else if (value === "type") {
      update(typeData, typeAvg); //Lame hard code, should come from popped value
    } else {
      update(totalData, totalAvg); //Lame hard code, should come from popped value
    }
  }

  // Update chart with chosen data ////////////////////////////////////////////////////////
  function update(data, average) {
    // get max and min score values for current data ...
    var scoreMax = d3.max(data, d => d.thisScore);
    var scoreMin = d3.min(data, d => d.thisScore);

    //set domain for the x axis
    xScale.domain([scoreMin * 0.95, scoreMax * 1.1]);

    //set domain for y axis
    yScale.domain(data.map(d => d.last_name)); // Y-value labels: Player's name

    //select all bars on the graph, take them out, and exit the previous data set.
    //then can add/enter the new data set

    //var bars = svg.selectAll(".bar")
    //     .remove()
    //     .exit()
    //     .data(d => [d])

    var bars = chart
      .selectAll("last_name")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "last_name")
      .attr("transform", `translate(${margin.left}, 0)`);

    //now actually give each rectangle the corresponding data

    /* Add score bars */
    bars
      .selectAll("rect")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("width", d => xScale(d.thisScore))

      .attr("y", function(d) {
        return yScale(d.last_name);
      }) //return athe
      .attr("height", yScale.bandwidth())
      .attr("ry", "4")

      // .style("fill", "#4285f4")
      //.style("fill", "#de7119")
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
      .attr("x1", scoreVal)
      .attr("y1", 0)
      .attr("x2", scoreVal)
      .attr("y2", height - margin.bottom - margin.top);

    // Average Line Label
    line
      .append("text")
      .attr("class", "averageLabel")
      .attr("text-anchor", "none")
      .attr("x", scoreVal + 10)
      .attr("y", yScale.bandwidth() / 2)
      .text("Average "+ average + " (" + scoreType + " score)");
    } //end update    ///////////////////////////////////////////////////////////
  }
}
export default TeamCompareChart;
