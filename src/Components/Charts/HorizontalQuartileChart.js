import './horizontalQuartileChart.css';
import * as d3 from 'd3';
import Chart from "./Chart";


class HorizontalQuartileChart extends Chart {
    addChartLayer({svg, tx, ty, values, userScore, svg_width, svg_height, textColor}) {

        tx= tx || 0; // x,y translate the chart's whole svg on the page
        ty = ty || 0;
        svg_width = svg_width || 580;
        svg_height = svg_height || 90;
        textColor = textColor || "#4f4a4a";
        let {teamMin, teamMax, q1, median, q3, max} = values;
        let lowLimit = teamMin * .95;
        let upLimit = teamMax * 1.05;
        // values: {teamMin: 550, teamMax: 960,  q1: 695, median: 765, q3: 845, max: 1400, userScore: 832 }

        // Setup svg using d3's margin convention
        let margin = {top: 37, right: 60, bottom: 8, left: 60};

        let height = svg_height - margin.top - margin.bottom,
            width = svg_width - margin.left - margin.right;

        // Set tick value based on chart width ...
        let numTicks = 1;
        if(width < 100 ) numTicks = 1
            else if (width >= 100 && width < 200 ) numTicks = 3
            else if (width >= 200 && width < 300 ) numTicks = 5
            else if (width >= 300 && width < 480 ) numTicks = 9
            else numTicks = 13 ;      

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", "translate(" + tx + "," + ty + ")")
             .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// values: {teamMin: 550, q1: 695, median: 765, q3: 845, teamMax: 960, max: 1400, userScore: 832 }
// data converted to use d3 stack chart.
        let data = [
            { name: "notUsed",
                teamMin: teamMin,
                q1: q1-teamMin,
                median: median-q1,
                q3: q3-median,
                teamMax: teamMax-q3,
                max: upLimit }
        ];
        let colors = ["white","#e65640", "#d99440", "#c7d63e", "#70bf57", "white"];
        const t = d3.transition().duration(1000);
/////////////
// Adopted from: https://bl.ocks.org/d3indepth/30a7091e97b03eeba2a6a3ca1067ca92
// Below
        console.log(teamMin, q1, median, q3, teamMax, max);
        let stack = d3.stack()
            .keys(['teamMin', 'q1', 'median', 'q3', 'teamMax', 'max']);

/// THIS IS HUGE !!! this stackedSeries WORKS!
        let stackedSeries = stack(data);

// group names  --> show them on the Y axis - "notUsed" here, shown for reference.
        //let groups = d3.map(data, function(d){return(d.name)}).keys()

// Add Y axis
        let yScale = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, height])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0, 20)")

        // Add X axis
        let axis_top = margin.top - 20;
        let xScale = d3.scaleLinear()
            .domain([teamMin, teamMax])
            .range([ 0, width ]);
        svg.append("g")
            .attr('class', 'xAxisHQ ' + textColor)
            .attr("transform", "translate(" + margin.left + ", " + axis_top + ")")
            .call(d3.axisBottom(xScale)
                    .ticks(numTicks));

// Create a group, g, element for each series
        let g = svg.select('g')
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
            .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]); })
            .attr("x", function(d) { return xScale(d[0]); })
            .attr('y', function(d, i) { return i * 10; })
            .attr("height",yScale.bandwidth()*.9)

            .attr("ry", "3")
            .style("stroke", "black")

// User's Score -
        let scoreVal = userScore;

        let scoreScale = d3.scaleLinear()
            // .domain([0, max])
            .domain([teamMin, teamMax])
            .range([ 0, width ]);


        g.selectAll("circle")
            .data(function(d) { return d; })
            .enter()
            .append("circle")
            .attr("opacity", 0)
            .attr("cy", (yScale.bandwidth()*.45))    // location in bar
            .attr("cx", 0)   // Starting cond. for X
            .attr("r", (yScale.bandwidth()*.375))
            .attr("fill", "#515252")
            .style("stroke", "black")
            .style("stroke-width", 1.5)
            .transition(t)
              .delay(350)
              .attr("cx", scoreScale(scoreVal)) // End position => score;
              .attr("opacity", .4)
              // .attr("fill", "#515252")

        g.append("text")
            .text(scoreVal)
            .style("font-size",  "10px")
            .attr("fill", textColor)
            .attr("opacity", 0)
            .attr("y",(yScale.bandwidth() + 10 ))
            .attr("x", scoreScale(scoreVal) - 10)
            .transition(t)
                .delay(300)
                .attr("opacity", 1)

        g.append("text")        
            .text("Your Score")
            .style("font-size",  "10px")
            .attr("fill", textColor)
            .attr("opacity", 0)
            .attr("y",(yScale.bandwidth() + 20 ))
            .attr("x", scoreScale(scoreVal) - 25)
            .transition(t)
                .delay(300)
                .attr("opacity", 1) 
            
        // max-min lines/text
        let line = g
        line
          .append("line")
          .style("stroke-width", 1)
          .style("stroke-dasharray", "5, 4")
          .style("stroke","blue")
          .attr("x1", -margin.left +8)
          .attr("x2", -margin.left +8)
          .attr("y1", -8)
          .attr("y2", yScale.bandwidth()*.9)
       
        line
          .append("line")
          .style("stroke-width", 1)
          .style("stroke-dasharray", "5, 4")
          .style("stroke","blue")
          .attr("x1", svg_width - margin.left -10)
          .attr("x2", svg_width - margin.left -10)
          .attr("y1", -8)
          .attr("y2", yScale.bandwidth()*.9)

        let text = g
        text  
          .append("text")        
          .text("0")
          .style("font-size",  "10px")
          .attr("fill", "blue")
          .attr("opacity", 1)
          .attr("y", -14)
          .attr("x", -margin.left +5)  

        text.append("text")        
        .text("Team Low (" + teamMin + ")")
          .style("font-size",  "10px")
          .attr("fill", textColor)
          .attr("opacity", 0)
          .attr("x", scoreScale(teamMin) - 40)
          .attr("y", -30)
          .transition(t)
              .delay(300)
              .attr("opacity", 1)  

        text.append("text")        
          .text("Median (" + median + ")")
          .style("font-size",  "10px")
          .attr("fill", textColor)
          .attr("opacity", 0)
          .attr("x",0 )
          .attr("x", scoreScale(median) - 40 )
          .attr("y", -30)
          .transition(t)
              .delay(300)
              .attr("opacity", 1) 
        
        text.append("text")        
          .text("Team High (" + teamMax + ")")
          .style("font-size",  "10px")
          .attr("fill", textColor)
          .attr("opacity", 0)
          .attr("x", scoreScale(teamMax) - 35)
          .attr("y", -30)
          .transition(t)
              .delay(300)
              .attr("opacity", 1)                

        text  
          .append("text")        
          .text("1400")
          .style("font-size",  "10px")
          .attr("fill", "blue")
          .attr("opacity", 1)
          .attr("y", -14)
          .attr("x", svg_width - margin.left -25)   

    }
}
export default HorizontalQuartileChart;