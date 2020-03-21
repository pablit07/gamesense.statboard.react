import './teamCompareChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";
import test_data from "./test_data";

class GroupedBarChart extends Chart {

    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

        /////////////
        var data = test_data;

        var players = data.map(i => i.lastName); 

        
        var margin = {top: 30, right: 20, bottom: 20, left: 70},
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            
            axisTicks = {qty: 11};

        var xScale = d3.scaleLinear()
            .range([0, width])
            //.domain([0, d3.max(data, d => d.prScore)]);
            .domain([250, 460]);

            console.log('================================')
            console.log(d3.max(data, d => d.prScore)); //900
            console.log()


        var yScale = d3.scaleBand()
            .range([height-margin.top-margin.bottom, 0])
            .domain(data.map(d => d.lastName))
            .padding(.125);
            console.log('============ xxx ==================')
            console.log(yScale("Coach")); //38.947

        var logScale= d3.scaleLog()
            .range([0, width])
            .domain([0, d3.max(data, d => d.prScore)]);   

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


        var lastName = svg.selectAll(".lastName")
            .data(data)
            .enter()
                .append("g")
                .attr("class", "lastName")
                .attr("transform", `translate(${margin.left+1},-4)`);
            
        /* Add ball/strike location bars */
        lastName.selectAll(".bar.location") 
            .data(d => [d])
            .enter()
                .append("rect")
                .attr("class", "bar location")
                .attr("x", 0)
                .attr("width", d => xScale(d.location))

                .attr("y", function(d) { return yScale(d.lastName); }) //This took 2 hours!!
                
                .attr("height", yScale.bandwidth())
            
            .style("fill", "#4285f4")
            .style("stroke", "black")
            .style("stroke-width", .5)
            .attr("opacity", 1.0)
            .attr("ry", "1");

        // /* Add pitchType bars */
        // lastName.selectAll(".bar.pitchType")
        //     .data(d => [d])
        //     .enter()
        //     .append("rect")
        //     .attr("class", "bar pitchType")
        //     .style("fill","#4285f4")
        //     .style("stroke", "black")
        //     .style("stroke-width", .5)
        //     .attr("opacity", 1.0)
        //     .attr("ry", "1")
        //     .attr("x", d => yScale1('pitchType'))
        //     .attr("y", d => xScale(d.pitchType))
        //     .attr("width", yScale1.bandwidth()* 1.0)
        //     .attr("height", d => {
        //     return height - margin.top - margin.bottom - xScale(d.pitchType)
        //     });


        // /* Add prScore bars */
        // lastName.selectAll(".bar.prScore")
        //     .data(d => [d])
        //     .enter()
        //     .append("rect")
        //     .attr("class", "bar prScore")
        //     .style("fill","#fbbc04")
        //     .style("stroke", "black")
        //     .style("stroke-width", .5)
        //     .attr("opacity", 1.0)
        //     .attr("ry", "1")
        //     .attr("x", d => yScale1('prScore'))
        //     .attr("y", d => xScale(d.prScore))
        //     .attr("width", yScale1.bandwidth()* 1.0)
        //     .attr("height", d => {
        //     return height - margin.top - margin.bottom - xScale(d.prScore)
        //     });


        // Add the X Axis
        svg.append("g")
            .attr("class", "xAxisTC")
            .attr("transform", `translate(${margin.left},${height - margin.top - margin.bottom - 5})`)
            .call(xAxis)
            // rotate labels
            // .selectAll("text")
            //     .style("text-anchor", "start")
            //     .attr("dx", ".8em")
            //     .attr("dy", ".25em")
            //     .attr("transform", function (d) {
            //     return "rotate(45)";
            // });
        
        // Add the Y Axis
        svg.append("g")
            .attr("class", "yAxisTC")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(yAxis); 

    }
}
export default GroupedBarChart;