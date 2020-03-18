import './teamCompareChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";
import test_data from "./test_data";

class GroupedBarChart extends Chart {

    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

/////////////
var data = test_data;

// Sample data:
        // var players = [
        // {
        //     "firstName": "Brett",
        //     "lastName": "McCleary",
        //     "pitchType": "360",
        //     "location": "300",
        //     "prScore": "770",
        //     "bonus": "110"
        //     },
        //     {
        //     "firstName": "Lorenzo",
        //     "lastName": "Elion",
        //     "pitchType": "300",
        //     "location": "360",
        //     "prScore": "765",
        //     "bonus": "105"
        //     }
        // ];
        var players = data.map(i => i.lastName); 

        
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
            width = 550 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom,
            
            axisTicks = {qty: 7};
        
        var yScale0 = d3.scaleBand()
            .range([height,0])
            .paddingInner(.1);
                    
        var yScale1 = d3.scaleBand()
            .padding(0.05);

        var xScale = d3.scaleLinear()
            .range([0, width]);



        var color =d3.scaleOrdinal()
            .range(["#4285f4", "#ea4335","#fbbc04"]);
        
        var xAxis = d3.axisBottom(xScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);    
        var yAxis = d3.axisLeft(yScale0).tickSizeOuter(axisTicks.outerSize);

        // Define a common transition 
        const t = d3.transition().duration(1000);
        
        yScale0.domain(data.map(d => d.lastName));
        yScale1.domain(['pitchType', 'prScore', 'location']).range([0, yScale0.bandwidth()]);
   
        xScale.domain([0, d3.max(data, d => d.prScore)]);

        svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        var lastName = svg.selectAll(".lastName")
            .data(data)
            .enter().append("g")
            .attr("class", "lastName")
            .attr("transform", d => `translate( ${yScale0(d.lastName) +50 },10)`); 

        /* Add pitchType bars */
        lastName.selectAll(".bar.pitchType")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar pitchType")
            .style("fill","#4285f4")
            .style("stroke", "black")
            .style("stroke-width", .5)
            .attr("opacity", 1.0)
            .attr("ry", "1")
            .attr("y", d => height - margin.top - margin.bottom)          // Starting cond. for height
        

            
        /* Add ball/strike location bars */
        lastName.selectAll(".bar.location") 
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar location")
            .style("fill", "#ea4335")
            .style("stroke", "black")
            .style("stroke-width", .5)
            .attr("opacity", 1.0)
            .attr("ry", "1")
            .attr("x", d => yScale1('location'))
            .attr("y", d => xScale(d.location))
            .attr("height", yScale1.bandwidth()*1)

            // .attr("transform", `translate(${yScale1.bandwidth()*(-0.25)},0)`) 

            .attr("width", d => {
            return width - margin.top - margin.bottom + xScale(d.location)
            });

        /* Add prScore bars */
        lastName.selectAll(".bar.prScore")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar prScore")
            .style("fill","#fbbc04")
            .style("stroke", "black")
            .style("stroke-width", .5)
            .attr("opacity", 1.0)
            .attr("ry", "1")
            .attr("x", d => yScale1('prScore'))
            .attr("y", d => xScale(d.prScore))
            .attr("width", yScale1.bandwidth()* 1.0)
            .attr("height", d => {
            return height - margin.top - margin.bottom - xScale(d.prScore)
            });


        // Add the X Axis
        svg.append("g")
            .attr("class", "xAxisTC")
            .attr("transform", `translate(${margin.left},${height - margin.top - margin.bottom+10})`)
            .call(xAxis)
            // rotate labels
            .selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", ".8em")
                .attr("dy", ".25em")
                .attr("transform", function (d) {
                return "rotate(45)";
            });
        
        // Add the Y Axis
        svg.append("g")
            .attr("class", "yAxisTC")
            .attr("transform", `translate(${margin.left},10)`)
            .call(yAxis); 

    }
}
export default GroupedBarChart;