
import * as d3 from 'd3';
import Chart from "./Chart";

class LegendHoriz extends Chart {
    addChartLayer({svg, xPos, spacing, svg_width, textColor}) {

        textColor = textColor || "black";
        var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];
        colors = colors.reverse();

        var width = svg_width || 680,
            height = 40;
        xPos = xPos || 0;   // move Legend left(neg. number) 
                            // and right (pos. number). 
        
        spacing = spacing || 90;   //Distance between each item in the Legend
        if (spacing < 65) {
            spacing = 65
        };
                                       

// Draw legend

        var legendSvg = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + ((width * .25) +xPos) + ", 0)")

        var legend = legendSvg.selectAll("legend")
            .data(colors)
            .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(" + (i * spacing) + ", 0)"; });
              // .attr("transform", "translate(20, 0)");

        legend.append("rect")
            .attr("x", 0)
            .attr("y", 5)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) {return colors.slice().reverse()[i];});

        legend.append("text")
            .attr('fill', textColor)
            .attr("x", 22)
            .attr("y", 14)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) {
                switch (i) {
                    case 0: return "Lowest";
                    case 1: return "Top 25%";
                    case 2: return "Top 50%";
                    case 3: return "Top 75%";
                }
            });

    }
}
export default LegendHoriz;