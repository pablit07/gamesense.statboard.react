import '../../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import * as d3 from 'd3';
import Axes2dChart from "./Axes2dChart";


class BarChart extends Axes2dChart {
    addChartLayer(svg, rows, xScale, yScale, pt, color) {
        // ignore blank rows
        // rows = rows.filter(xScale => !!xScale[pt] && xScale[pt] !== '-');
        console.log("--------------- rows ----------------");
        console.log(rows);

        const rects = svg.selectAll("rect")
        
        let barWidth = ((this.state.width * 0.9) / xScale.range().length);

        // Gradient Colors
        // Create the svg:defs element and the main gradient definition.
        var svgDefs = svg.append('defs');

        var mainGradient = svgDefs.append('linearGradient')
            .attr('id', 'mainGradient');

        // Create the stops of the main gradient. Each stop will be assigned
        // a class to style the stop using CSS.
        mainGradient.append('stop')
            .attr('class', 'stop-left')
            .attr('offset', '0');

        mainGradient.append('stop')
            .attr('class', 'stop-right')
            .attr('offset', '1');

        const widthTween = (d) => {
            // define interpolation for the tween
            // d3.interpolate returns a function we'll call 'i'
            // let i = d3.interpolate(0, x.bandwidth());
            let i = d3.interpolate(0, Math.max(barWidth, 1));

            // return a function which takes in a time ticker 't'
            return function(t){
                return i(t);
            }
        }
        // create a tooltip
        var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1.2px")
            .style("border-radius", "5px")
            .style("padding", "5px");

        var mouseover = function(d) {
            d3.select(this)
                .style("stroke-width", "1.5px")
                .style("stroke", "#1c94aa")
                .attr("ry", 1)

            tooltip
                .style("opacity", 1)
                .style("left",  "300px")
                .style("top", (parseInt(d3.select(this).attr("cy")) + "px"))
                .style("visibility", "visible")
        }
        var mousemove = function(d) {
            tooltip
                .html("<center>Performed: " + d.count + " drills<br>during: " + d.date_format +"</center>")
                .style("left",(d3.event.pageX + 10)+"px")
                .style("top", (d3.event.pageY - 50)+"px");
        }

        var mouseleave = function(d) {
            d3.select(this)
                .style("stroke", "none")
                .attr("ry", 0)
            tooltip
                .style("visibility", "hidden")
        }
        
        // Define the transition once here, and use it for all transitions
        // so the same duration is used on all animations.
        const t = d3.transition().duration(500);  // 500 millisecons, .5 second

        // EXIT - remove unwanted rects
        rects.exit().remove();

        // UPDATE

        svg.append('g')
            .attr("transform", "translate(25,0)")
            .selectAll('rect') // this 'selects' the yet to be created rects.
            .data(rows) 
            .enter()
              .append('rect')
              .classed('filled', true)
              .attr("width", Math.max(barWidth, 1))
              .attr("height", d => 0)                 // Starting cond. for height.
              .attr("x", d => xScale(d[pt]))
              .attr("y", d => this.state.height - 50)      
              // tooltip calls
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseleave", mouseleave)
              .style("opacity", 1)
              //  Transition up!
              .transition(t)
                  .attrTween('width', widthTween)
                  // .delay((d, i) => { return i * 50; })
                  .attr("height", d => this.state.height - yScale(d[pt])  - 50)
                  .attr("y", d => yScale(d[pt]));
    }
}
export default BarChart;