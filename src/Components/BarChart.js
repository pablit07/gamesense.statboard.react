import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import * as d3 from 'd3';
import Chart from "../Components/Chart";


class BarChart extends Chart {
    constructor(props) {
        super(props);
    }

    addChartLayer(svg, rows, x, y, pt, color) {
        // ignore blank rows
        rows = rows.filter(x => !!x[pt] && x[pt] !== '-');

        let barWidth = ((this.state.width * 0.9) / x.range().length);

        svg.append('g')
            .attr("transform", "translate(5,0)")
            .selectAll('bar')
            .data(rows)
            .enter()
            .append('rect')
            .style('fill', color)
            .attr("x", d => x(d[pt]))
            .attr("width", Math.max(barWidth, 1))
            .attr("y", d => y(d[pt]))
            .attr("height", d => this.state.height - y(d[pt]) - 50)
    }

    yAxisFormat(yAxis) {
        let axis = super.yAxisFormat(yAxis);
        axis.ticks(5, "s");
        return axis;
    }
}

export default BarChart;