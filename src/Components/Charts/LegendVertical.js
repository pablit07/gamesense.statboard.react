
import * as d3 from 'd3';
import Chart from "./Chart";

class LegendVertical extends Chart {
    addChartLayer({svg, textColor}) {

        textColor = textColor || "black";
        var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];

        var width = 680,
        height = 40;

// Draw legend
        var legendSvg = svg
           
            .attr("width", 90)          // MAKE THESE PROPERTIES!
            .attr("height", 98)       // This must match the height of the Horizontal Chart.
            .append("g")
             .attr("transform", "translate(0, " + (height * .5) + ")")


        var legend = legendSvg.selectAll("legend")
            .data(colors)
            .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(15," + (i * 19) + ")"; });

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
                    case 0: return "Top 25%";
                    case 1: return "Top 50%";
                    case 2: return "Top 75%";
                    case 3: return "Lowest";
                }
            });

    }
}
export default LegendVertical;