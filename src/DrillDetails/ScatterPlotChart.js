import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import Chart from "./Chart";


class ScatterPlotChart extends Chart {
    constructor(props) {
        super(props);
    }

    addChartLayer(svg, rows, x, y, pt, color) {
        // ignore blank rows
        rows = rows.filter(x => !!x[pt] && x[pt] !== '-');

        svg.append('g')
            .selectAll('dot')
            .data(rows)
            .enter()
            .append("circle")
            .attr("cx", d => {
                return x(d[this.props.name]);
            })
            .attr("cy", d => {
                return y(d[pt]);
            })
            .attr("r", 5)
            .style("fill", color)
    }
}

export default ScatterPlotChart;