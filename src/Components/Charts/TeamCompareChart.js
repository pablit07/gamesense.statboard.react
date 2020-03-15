import './teamCompareChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";
import test_data from "./test_data";


class TeamCompareChart extends Chart {

    addChartLayer({svg, values, svg_width, svg_height, textColor}) {

        
/////////////
        var models = [
            {
            "model_name":"f1",
            "field1":19,
            "field2":83
            },
            {
            "model_name":"f2",
            "field1":67,
            "field2":93
            },
            {
            "model_name":"f3",
            "field1":10,
            "field2":56
            },
            {
            "model_name":"f4",
            "field1":98,
            "field2":43
            }
        ];
        models = models.map(i => {
            i.model_name = i.model_name;
            return i;
        });
        
        var width = 500,
            height = 300,
            margin = {top: 30, right: 20, bottom: 30, left: 50},
            barPadding = .2,
            axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

        svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
        var xScale1 = d3.scaleBand();
        var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
        
        var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
        var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
        
        xScale0.domain(models.map(d => d.model_name));
        xScale1.domain(['field1', 'field2']).range([0, xScale0.bandwidth()]);
        yScale.domain([0, d3.max(models, d => d.field1 > d.field2 ? d.field1 : d.field2)]);
        
        var model_name = svg.selectAll(".model_name")
            .data(models)
            .enter().append("g")
            .attr("class", "model_name")
            .attr("transform", d => `translate(${xScale0(d.model_name)},0)`);
        
        /* Add field1 bars */
        model_name.selectAll(".bar.field1")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar field1")
        .style("fill","blue")
            .attr("x", d => xScale1('field1'))
            .attr("y", d => yScale(d.field1))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.field1)
            });
            
        /* Add field2 bars */
        model_name.selectAll(".bar.field2")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar field2")
        .style("fill","red")
            .attr("x", d => xScale1('field2'))
            .attr("y", d => yScale(d.field2))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.field2)
            });
        
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
            .call(xAxis);
        
        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis); 
  

///////////
                // // Adopted from: https://bl.ocks.org/d3indepth/30a7091e97b03eeba2a6a3ca1067ca92
                // // Below

                //         var stack = d3.stack()
                //             .keys(['q1', 'median', 'q3', "max"]);

                // /// THIS IS HUGE !!! this stackedSeries WORKS!
                //         var stackedSeries = stack(data);

                // // group names  --> show them on the Y axis - "notUsed" here
                //         var groups = d3.map(data, function(d){return(d.name)}).keys()

                // // Add Y axis
                //         var y = d3.scaleBand()
                //             .domain(data.map(d => d.name))
                //             .range([0, height])
                //             .padding([0.2])
                //         svg.append("g")
                //             .attr("transform", "translate(0, 20)")

                //         // Add X axis
                //         var axis_top = margin.top -     20;
                //         var x = d3.scaleLinear()
                //             .domain([0, max])
                //             .range([ 0, width ]);
                //         svg.append("g")
                //             .attr('class', 'xAxis ' + textColor)
                //             // .attr("transform", "translate(0, -20)")
                //             .attr("transform", "translate(" + margin.left + ", " + axis_top + ")")
                //             .call(d3.axisBottom(x)
                //                     .ticks(numTicks));

                // // Create a group, g, element for each series
                //         var g = svg.select('g')
                //             .selectAll('g.series')
                //             .data(stackedSeries)
                //             .enter()
                //             .append('g')
                //             .classed('series', true)
                //             .style('fill', function(d, i) {
                //                 return colors[i];
                //             });

                // // For each series, (we have only one), create a rect element for each.
                //         g.selectAll('rect')
                //             .data(function(d) {
                //                 return d;
                //             })

                //             .enter()
                //             .append("rect")
                //             .attr("width", function(d) { return x(d[1]) - x(d[0]); })
                //             .attr("x", function(d) { return x(d[0]); })
                //             .attr('y', function(d, i) { return i * 10; })
                //             .attr("height",y.bandwidth()*.9)

                //             .attr("ry", "3")
                //             .style("stroke", "black")

                // // User's Score -
                //         var scoreVal = userScore;

                //         var scoreScale = d3.scaleLinear()
                //             .domain([0, max])
                //             .range([ 0, width ]);


                //         g.selectAll("circle")
                //             .data(function(d) { return d; })
                //             .enter()
                //             .append("circle")
                //             .attr("opacity", 0)
                //             .attr("cy", (y.bandwidth()*.45))    // location in bar
                //             .attr("cx", 0)   // Starting cond. for X
                //             .attr("r", (y.bandwidth()*.375))
                //             .attr("fill", "#515252")
                //             .style("stroke", "black")
                //             .style("stroke-width", 1.5)
                //             .transition(t)
                //             .attr("cx", scoreScale(scoreVal)) // End position => score;
                //             .attr("opacity", .6)
                //             .attr("fill", "#6ec057")

                //         g.append("text")
                //             .text(scoreVal)
                //             // .attr("font-size", 12)
                //             .attr("fill", textColor)
                //             .attr("opacity", 0)
                //             .attr("y",(y.bandwidth() + 10 ))
                //             .attr("x", scoreScale(scoreVal) - 10)
                //             .transition(t)
                //                 .attr("opacity", 1)

                //         g.append("text")        
                //             .text("Your Score")
                //             .attr("fill", textColor)
                //             .attr("opacity", 0)
                //             .attr("y",(y.bandwidth() + 20 ))
                //             .attr("x", scoreScale(scoreVal) - 25)
                //             .transition(t)
                //                 .attr("opacity", 1)

    }
}
export default TeamCompareChart;