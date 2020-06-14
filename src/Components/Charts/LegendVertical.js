import Chart from "./Chart";

class LegendVertical extends Chart {
    addChartLayer({svg, tx, ty, yPos, svg_height, textColor}) {

        textColor = textColor || "black";
        let colors = ["#e65640", "#d99440", "#c7d63e", "#70bf57"];

        let height = svg_height || 90;  // This must match the height of the Horizontal Chart it is next to.
        let width = 90;
        tx= tx || 0; // x,y translate the chart's whole svg on the page
        ty = ty || 0;

        yPos = yPos || 5; //This adjusts the Legend elements verticle location in their svg. 
                          //Positive numbers move them down.

// Draw legend
        let legendSvg = svg
           
            .attr("width", width)
            .attr("height", height)    
            .attr("transform", "translate(" + tx + "," + ty + ")")   
            .append("g")
             .attr("transform", "translate(0, " + yPos + ")");  


        let legend = legendSvg.selectAll("legend")
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
            .attr("y", 9)
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