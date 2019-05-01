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

        svg.append('g')
        // TODO!!!!
    }
}

export default BarChart;