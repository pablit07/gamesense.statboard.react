import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import * as d3 from 'd3';
import Chart from "./Chart";


class BarChart extends Chart {
    constructor(props) {
        super(props);
    }

    addChartLayer(svg, rows, x, y, pt, color) {
        // ignore blank rows
        rows = rows.filter(x => !!x[pt] && x[pt] !== '-');

        let barWidth = 350 / x.range().length;

        svg.append('g')
            .attr("transform", "translate(5,0)")
            .selectAll('bar')
            .data(rows)
            .enter()
            .append('rect')
            .style('fill', color)
            .attr("x", d => x(new Date(d.date)))
            .attr("width", Math.max(barWidth, 1))
            .attr("y", d => y(d[pt]))
            .attr("height", d => this.state.height - y(d[pt]) - 50)
    }

    xAxisFormat(xAxis) {
        return super.xAxisFormat(xAxis).tickFormat(d3.timeFormat("%Y-%m"))
    }
}

export default BarChart;