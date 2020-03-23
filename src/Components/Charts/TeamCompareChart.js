import './teamCompareChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";
import test_data from "./test_data";

class TeamCompareChart extends Chart {

    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

        // var data = test_data;
        var data = this.props.values;

      


        console.log("============== And the values are ... ===========");
        console.log(data);

        // choose typ of data to display
        var selectedScore =  0;  // this will be 0, 1, 2 as set by radio buttons
        var scoreTypes = ["location", "type", "total"];
        var scoreType = scoreTypes[selectedScore];   // 'location' for now
        

        // get max and min values for xScale.domain  ... 
        var locationScoreMax = d3.max(data, d => d.first_glance_location_score);
        var typeScoreMax = d3.max(data, d => d.first_glance_type_score);
        var totalScoreMax = d3.max(data, d => d.first_glance_total_score); 

        var locationScoreMin = d3.min(data, d => d.first_glance_location_score);
        var typeScoreMin = d3.min(data, d => d.first_glance_type_score);
        var totalScoreMin = d3.min(data, d => d.first_glance_total_score);

        console.log('============= scoreType =================')
        console.log(scoreType);
        console.log('============= typeScoreMin =================')
        console.log(typeScoreMin);
        console.log('============= typeScoreMax =================')
        console.log(typeScoreMax);
        console.log('============= totalScoreMax =================')
        console.log(totalScoreMax);

        //Sample of data:
        // first_name: "Borgschulte"
        // last_name: "Matt"
        // id_submission: "d05117329c6ad291b2812ec2151906e8"
        // first_glance_location_score: 220
        // first_glance_type_score: 160
        // first_glance_total_score: 415
        // activity_id: 397258
  
        var margin = {top: 30, right: 20, bottom: 20, left: 70},
            width = 500 - margin.left - margin.right,
            height = 650 - margin.top - margin.bottom,
            axisTicks = {qty: 11};    

        var xScale = d3.scaleLinear()
            .range([0, width]);
            if (scoreType === "location") {
                xScale.domain([(locationScoreMin * .95),(locationScoreMax *1.1)]);
            }
            if (scoreType === "type") {
                xScale.domain([(typeScoreMin * .95),(typeScoreMax *1.1)]);
            }
            if (scoreType === "total") {
                xScale.domain([(totalScoreMin * .95),(totalScoreMax *1.1)]);
            }

        var yScale = d3.scaleBand()
            .range([height-margin.top-margin.bottom, 0])
            .domain(data.map(d => d.last_name))
            .padding(.125);
            console.log('============ xxx ==================')
            console.log(yScale("Coach")); //38.947


        var color =d3.scaleOrdinal()
            .range(["#4285f4", "#ea4335","#fbbc04"]);
            
        var yAxis = d3.axisLeft(yScale)
            .tickSizeOuter(axisTicks.outerSize);

        var xAxis = d3.axisBottom(xScale)
            .ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);    

        svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

        var last_name = svg.selectAll(".last_name")
            .data(data)
            .enter()
                .append("g")
                .attr("class", "last_name")
                .attr("transform", `translate(${margin.left+1},-4)`);
            
        /* Add ball/strike location bars */
        last_name.selectAll(".bar.location") 
            .data(d => [d])
            .enter()
                .append("rect")
                .attr("class", "bar location")
                .attr("x", 0)

                .attr("width", d => xScale(d.first_glance_location_score))

                .attr("y", function(d) { return yScale(d.last_name); }) //return any valid element of the data,  d.<something valid>
                
                .attr("height", yScale.bandwidth())
            
                .style("fill", "#4285f4")
                .style("stroke", "black")
                .style("stroke-width", .5)
                .attr("opacity", 1.0)
                .attr("ry", "1");

        // TODO Add text to bars

        // Add the X Axis
        svg.append("g")
            .attr("class", "xAxisTC")
            .attr("transform", `translate(${margin.left},${height - margin.top - margin.bottom - 5})`)
            .call(xAxis);
        
        // Add the Y Axis
        svg.append("g")
            .attr("class", "yAxisTC")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(yAxis); 
    } 
}
export default TeamCompareChart;