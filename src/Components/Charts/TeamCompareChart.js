import './teamCompareChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";
import test_data from "./test_data";

class TeamCompareChart extends Chart {

    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

        var data = this.props.values;
        var allData = data;
        console.log("============== And the values are ... ===========");
        console.log(data);

        // choose type of data to display
        var selectedScore =  0;  // this will be 0, 1, 2 as set by radio buttons
        var scoreTypes = ["location", "type", "total"];
        var scoreType = scoreTypes[selectedScore];   // 'location' for now

        // ToDo: Put this in a function in a different file ...
        // split up data into {first_name: "", last_name: "", score: "<relevant_score>"}
        // var locationData = [];
        // var typeData = [];
        // var totalData = [];

        var locationData = [];
        for (let i=0; i<allData.length; i+=1) {
        let tmp = {};
        for(let key in allData[i]) {
            if (key === "first_name"){
            tmp.first_name = allData[i].first_name;
            } 
            if (key === "last_name"){
            tmp.last_name = allData[i].last_name;
            }
            if (key === "first_glance_location_score"){
            tmp.thisScore = allData[i].first_glance_location_score; 
            }
        }
        locationData.push(tmp);  
        }

        var typeData = [];
        for (let i=0; i<allData.length; i+=1) {
        let tmp = {};
        for(let key in allData[i]) {
            if (key === "first_name"){
            tmp.first_name = allData[i].first_name;
            } 
            if (key === "last_name"){
            tmp.last_name = allData[i].last_name;
            }
            if (key === "first_glance_type_score"){
            tmp.thisScore = allData[i].first_glance_type_score; 
            }
        }
        typeData.push(tmp);  
        }

        var totalData = [];
        for (let i=0; i<allData.length; i+=1) {
        let tmp = {};
        for(let key in allData[i]) {
            if (key === "first_name"){
            tmp.first_name = allData[i].first_name;
            } 
            if (key === "last_name"){
            tmp.last_name = allData[i].last_name;
            }
            if (key === "first_glance_total_score"){
            tmp.thisScore = allData[i].first_glance_total_score; 
            }
        }
        totalData.push(tmp);  
        }

        console.log('---------locationData---------')
        console.log(locationData);
        console.log('--------typeData----------')
        console.log(typeData);
        console.log('---------totalData---------')
        console.log(totalData);
        console.log('------------------')
 
////////////////////////////////////////////////////////////
//functions for toggling between data
        function change(value){

            if(value === 'location'){
                update(locationData);
            }else if(value === 'type'){
                update(typeData);
            }else{
                update(totalData);
            }
        }

        function update(data){
            console.log ("I am heeeeeeeeeeeeeeeeeere!");
            // get max and min score values for current data ... 
            var scoreMax = d3.max(data, d => d.thisScore);
            var scoreMin = d3.min(data, d => d.thisScore);

            //set domain for the x axis
            xScale.domain([(scoreMin * .95),(scoreMax *1.1)]);

            //set domain for y axis
            yScale.domain(data.map(d => d.last_name)); // this does not change 

            //select all bars on the graph, take them out, and exit the previous data set. 
            //then can add/enter the new data set
            
            //var bars = svg.selectAll(".bar")
            //     .remove()
            //     .exit()
            //     .data(d => [d])	
            
            var bars = svg.selectAll(".last_name")
                .data(data)
                .enter()
                    .append("g")
                    .attr("class", "last_name")
                    .attr("transform", `translate(${margin.left+1},-4)`);


            //now actually give each rectangle the corresponding data

            /* Add score bars */
            bars.selectAll(".bar.location") 
                .data(d => [d])
                .enter()
                    .append("rect")
                    .attr("class", "bar location")
                    .attr("x", 0)
                    .attr("width", d => xScale(d.thisScore))
                    //.attr("width", "500")
                    
                    .attr("y", function(d) { return yScale(d.last_name); }) //return athe
                    .attr("ry", "4")
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

        } //end update


        //set up chart
        var margin = {top: 30, right: 0, bottom: 20, left: 70},
            width = 500 - margin.left - margin.right,
            height = 650 - margin.top - margin.bottom,
            axisTicks = {qty: 11};    

        var xScale = d3.scaleLinear()
            .range([0, width]);

        var yScale = d3.scaleBand()
            .range([height-margin.top-margin.bottom, 0])
            .padding(.05);

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
        //add labels
        svg
            .append("text")
            .attr("transform", "translate(15," +  (height+margin.bottom)/2 + ") rotate(-90)")
            .text("Last Name");
            
        svg
            .append("text")
            .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
            .text("age group");

        //use allData to begin with
        update(typeData);

    } 
}
export default TeamCompareChart;