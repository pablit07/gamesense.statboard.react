import './teamCompareChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";
import test_data from "./test_data";


console.log(test_data);

class GroupedBarChart extends Chart {

    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

        
/////////////
var players = test_data;

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
        players = players.map(i => {
            i.lastName = i.lastName;
            return i;
        });
        
        var width = 800,
            height = 250,

            margin = {top: 30, right: 10, bottom: 30, left: 50},
            barPadding = .2,
            axisTicks = {qty: 7, outerSize: 0, dateFormat: '%m-%d'};

        svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
        var xScale1 = d3.scaleBand()
        var yScale = d3.scaleLinear()
                    .range([height - margin.top - margin.bottom, 0]);
        
        var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
        var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

        // Define a common transition 
        const trn = d3.transition().duration(1000);
        
        xScale0.domain(players.map(d => d.lastName));
        xScale1.domain(['pitchType', 'prScore', 'location']).range([0, xScale0.bandwidth()]);
        // yScale.domain([0, d3.max(players, d => d.pitchType > d.location ? d.pitchType : d.location)]);
        yScale.domain([0, d3.max(players, d => d.prScore)]);

        var lastName = svg.selectAll(".lastName")
            .data(players)
            .enter().append("g")
            .attr("class", "lastName")
            .attr("transform", d => `translate( ${xScale0(d.lastName) +50 },10)`); // WTF !

        /* Add pitchType bars */
        lastName.selectAll(".bar.pitchType")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar pitchType")
            .style("fill","#4285f4")
            .style("stroke", "black")
            .style("stroke-width", .5)
            .attr("ry", "1")
            .attr("x", d => xScale1('pitchType'))
            // .attr("y", d => yScale(d.pitchType))
            .attr("width", xScale1.bandwidth()*1.0)
            .attr("transform", `translate(${xScale1.bandwidth()*.25},0)`) // move thebar over to edge of PR bar.
            
            .attr("y", d => height - margin.top - margin.bottom)                 // Starting cond. for height
            .attr("height", d => 0)     // Starting cond. for Y
            .transition(trn)
                .attr("y", d => yScale(d.pitchType))
                .attr("height", d => height - margin.top - margin.bottom - yScale(d.pitchType));
            
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
            .attr("x", d => xScale1('location'))
            .attr("y", d => yScale(d.location))
            .attr("width", xScale1.bandwidth()*1)
            .attr("transform", `translate(${xScale1.bandwidth()*(-0.25)},0)`) 
            .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.location)
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
            .attr("x", d => xScale1('prScore'))
            .attr("y", d => yScale(d.prScore))
            .attr("width", xScale1.bandwidth()* 1.0)
            .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.prScore)
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