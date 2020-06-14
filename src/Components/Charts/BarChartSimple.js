
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import Axes2dChart from "./Axes2dChart";
class BarChart extends Axes2dChart {
    addChartLayer(svg, rows, xScale, yScale, pt, color) {

      console.log("--------------- rows ----------------");
      console.log(rows);
      
      let barWidth = ((this.state.width * 0.9) / xScale.range().length);

      svg.append('g')
          .attr("transform", "translate(25,0)")
          .selectAll('rect') // this 'selects' the yet to be created rects.
          .data(rows) 
          .enter()
            .append('rect')
          .attr("fill", "blue")
            .attr("width", Math.max(barWidth, 1))
            .attr("x", d => xScale(d[pt]))
            .attr("height", d => this.state.height - yScale(d[pt])  - 50)
            .attr("y", d => yScale(d[pt]));
    }
}
export default BarChart;