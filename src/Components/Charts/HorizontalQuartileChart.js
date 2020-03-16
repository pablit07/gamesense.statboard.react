import './horizontalQuartileChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";


class HorizontalQuartileChart extends Chart {
    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

        svg_width = svg_width || 580;
        let {q1, median, q3, max, userScore} = values;

        // Setup svg using d3's margin convention

        var margin = {top: 25, right: 25, bottom: 5, left: 30};


        var height = svg_height - margin.top - margin.bottom,
            width = svg_width - margin.left - margin.right;

        // Set tick value based on chart width ...
        var numTicks = 1;
        if(width < 100 ) numTicks = 1
            else if (width >= 100 && width < 200 ) numTicks = 3
            else if (width >= 200 && width < 300 ) numTicks = 5
            else if (width >= 300 && width < 480 ) numTicks = 9
            else numTicks = 13 ;      

        textColor = textColor || "black";

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
;

// data converted to use d3 stack chart.
        var data = [
            { name: "notUsed",
                q1: q1,
                median: median-q1,
                q3: q3-median,
                max: max-q3 }
        ];

        var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];
        const t = d3.transition().duration(1000);
/////////////
// Adopted from: https://bl.ocks.org/d3indepth/30a7091e97b03eeba2a6a3ca1067ca92
// Below

        var stack = d3.stack()
            .keys(['q1', 'median', 'q3', "max"]);

/// THIS IS HUGE !!! this stackedSeries WORKS!
        var stackedSeries = stack(data);

// group names  --> show them on the Y axis - "notUsed" here
        var groups = d3.map(data, function(d){return(d.name)}).keys()

// Add Y axis
        var y = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, height])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0, 20)")

        // Add X axis
        var axis_top = margin.top -     20;
        var x = d3.scaleLinear()
            .domain([0, max])
            .range([ 0, width ]);
        svg.append("g")
            .attr('class', 'xAxis ' + textColor)
            // .attr("transform", "translate(0, -20)")
            .attr("transform", "translate(" + margin.left + ", " + axis_top + ")")
            .call(d3.axisBottom(x)
                    .ticks(numTicks));

// Create a group, g, element for each series
        var g = svg.select('g')
            .selectAll('g.series')
            .data(stackedSeries)
            .enter()
            .append('g')
            .classed('series', true)
            .style('fill', function(d, i) {
                return colors[i];
            });

// For each series, (we have only one), create a rect element for each.
        g.selectAll('rect')
            .data(function(d) {
                return d;
            })

            .enter()
            .append("rect")
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("x", function(d) { return x(d[0]); })
            .attr('y', function(d, i) { return i * 10; })
            .attr("height",y.bandwidth()*.9)

            .attr("ry", "3")
            .style("stroke", "black")

// User's Score -
        var scoreVal = userScore;

        var scoreScale = d3.scaleLinear()
            .domain([0, max])
            .range([ 0, width ]);


        g.selectAll("circle")
            .data(function(d) { return d; })
            .enter()
            .append("circle")
            .attr("opacity", 0)
            .attr("cy", (y.bandwidth()*.45))    // location in bar
            .attr("cx", 0)   // Starting cond. for X
            .attr("r", (y.bandwidth()*.375))
            .attr("fill", "#515252")
            .style("stroke", "black")
            .style("stroke-width", 1.5)
            .transition(t)
            .attr("cx", scoreScale(scoreVal)) // End position => score;
            .attr("opacity", .6)
            .attr("fill", "#6ec057")

        g.append("text")
            .text(scoreVal)
            // .attr("font-size", 12)
            .attr("fill", textColor)
            .attr("opacity", 0)
            .attr("y",(y.bandwidth() + 10 ))
            .attr("x", scoreScale(scoreVal) - 10)
            .transition(t)
                .attr("opacity", 1)

        g.append("text")        
            .text("Your Score")
            .attr("fill", textColor)
            .attr("opacity", 0)
            .attr("y",(y.bandwidth() + 20 ))
            .attr("x", scoreScale(scoreVal) - 25)
            .transition(t)
                .attr("opacity", 1)

    }
}
export default HorizontalQuartileChart;