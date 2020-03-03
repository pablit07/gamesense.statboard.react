import './horizontalQuartileChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";


class HorizontalQuartileChart extends Chart {

    addChartLayer({svg, values}) {

        let {q1, median, q3, max, userScore} = values;

        // Setup svg using d3's margin convention

        var margin = {top: 40, right: 130, bottom: 5, left: 30};

        var height = 200 - margin.top - margin.bottom,
            width = 640 - margin.left - margin.right;

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
            .attr("transform", "translate(0,20)")

        // Add X axis
        var x = d3.scaleLinear()
            // .domain([0, 1400])
            .domain([0, max])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0, -20)")
            .call(d3.axisBottom(x));


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

            // .enter()
            //   .append('rect')
            //   .attr('width', function(d) {return d[1] - d[0]; })
            //   .attr('x', function(d) { return d[0]; })
            //   .attr('y', function(d, i) { return i * 20; })
            //   .attr('height', 19);

            .enter()
            .append("rect")
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("x", function(d) { return x(d[0]); })
            .attr('y', function(d, i) { return i * 10; })
            .attr("height",y.bandwidth()*.5)

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
            .attr("cy", (y.bandwidth()*.25))    // location in bar
            .attr("cx", 0)   // Starting cond. for X
            .attr("r", (y.bandwidth()*.185))
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
            .attr("fill", "black")
            .attr("opacity", 0)
            .attr("y",(y.bandwidth() * .6 ))
            .attr("x", scoreScale(scoreVal) - 10)
            .transition(t)
            .attr("opacity", 1)


// Draw legend
        var legend = svg.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(50," + i * 19 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) {return colors.slice().reverse()[i];});

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) {
                switch (i) {
                    case 0: return "Top Quartile";
                    case 1: return "Above Median";
                    case 2: return "Below Median";
                    case 3: return "Bottom Quartile";
                }
            });

    }
}
export default HorizontalQuartileChart;