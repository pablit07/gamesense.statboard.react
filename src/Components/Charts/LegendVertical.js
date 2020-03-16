import Chart from "./Chart";

class LegendVertical extends Chart {
    addChartLayer({svg, yPos, svg_height, textColor}) {

        textColor = textColor || "black";
        var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];

        var height = svg_height || 90;  // This must match the height of the Horizontal Chart it is next to.
        var width = 90;

        yPos = yPos || 5; //This adjusts the Legend elements verticle location in their svg. 
                          //Positive numbers move them down.

// Draw legend
        var legendSvg = svg
           
            .attr("width", width)
            .attr("height", height)       
            .append("g")
             .attr("transform", "translate(0, " + yPos + ")");  


        var legend = legendSvg.selectAll("legend")
            .data(colors)
            .enter().append("g")
              .attr("class", "legend")
              // loop thru each color, each time translate and add a rect + its text
              .attr("transform", function(d, i) { return "translate(10,0" + (i * 19) + ")"; }); 


        legend.append("rect")
            .attr("x", 0)
            .attr("y", 0)
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