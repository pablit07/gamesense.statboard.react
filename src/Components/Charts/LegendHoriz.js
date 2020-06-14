
import * as d3 from 'd3';
import Chart from "./Chart";

class LegendHoriz extends Chart {
    addChartLayer({svg, tx, ty, xPos, spacing, svg_width, textColor, textLabel}) {

        textColor = textColor || "black";

        var colors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];
        textLabel = [textLabel || "Quartiles:"];
        colors = colors.reverse();

        tx= tx || 0; // x,y translate the chart's whole svg on the page
        ty = ty || 0;

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
            .attr("transform", "translate(" + tx + "," + ty + ")")   
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
                    case 1: return "Top 75%";
                    case 2: return "Top 50%";
                    case 3: return "Top 25%";
                }
            });

        var label = legendSvg.selectAll("label")
            .data(textLabel)
            .enter()
            label.append("text")
            .attr("class", "legend")
            .attr('fill', textColor)
            .attr("x", -14)
            .attr("y", 13)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .style("font-weight",600)
            .style("font-size", "16px")
            .text(textLabel)

    }
}
export default LegendHoriz;