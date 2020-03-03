import '../../App.css';
import * as d3 from 'd3';
import React, {Component} from 'react';


class Chart extends Component {

    render() {

        if (this.ref) {
            let svg = d3.select(this.ref);
            svg.selectAll("g").remove();
        }

        let result = (<svg ref={r => {this.ref = r}}/>);

        if (this.ref) {

            let svg = d3.select(this.ref);
            this.addChartLayer({svg, ...this.props});
        }

        return result;
    }

    addChartLayer({svg, values}) {
        throw new Error("Must override addChartLayer")
    }
}

export default Chart;