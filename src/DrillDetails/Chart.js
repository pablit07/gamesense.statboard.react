import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import * as d3 from 'd3';


class Chart extends Component {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);


        this.state = {
            isLoading: false,
            startDate: dateOneMonthAgo,
            endDate: now,
            width: this.getWidth()
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({width: this.getWidth()});
    }

    getWidth() {
        return window.innerWidth - 150;
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    addChartLayer(svg, rows, x, y, pt, color) {
        throw new Error("Must override addChartLayer")
    }

    render() {
        let style = {
            paddingLeft: '50px'
        };

        let result = (
            <div style={style} >

                {/* Legend or controls */}
                <div style={{textAlign:'right'}}> {this.props.children} </div>

                {/* Chart */}
                <svg width={this.state.width}
                     height={400}>
                    <g transform={("translate(" + 30 + "," + 30 + ")")} ref={r => {this.ref = r}}>
                        <rect x={0} y={0}  height={400} width={this.state.width} style={{fill: "EBEBEB"}}/>
                        <text transform={"rotate(-90)"} y={-35} x={-(400 / 2)} dy={"1em"} style={{"textAnchor": "middle", "fontWeight": "bold"}}>
                            {this.props.yLabel}
                        </text>
                    </g>
                </svg>

            </div>);

        if (this.ref) {

            let rows = this.props.submissions;

            // console.warn(d3)
            let svg = d3.select(this.ref);

            // Add X axis

            let interval = (this.state.width - 20) / this.props.xValues.length;
            let numbers = Array.from({length: this.props.xValues.length}, (v, k) => k*interval);
            let xAxis = d3.scaleOrdinal()
                .domain( this.props.xValues)
                .range( numbers)

            svg.append("g")
                .attr("transform", "translate(0," + 350 + ")")
                .call(d3.axisBottom(xAxis));

            // Add Y axis
            let yAxis = d3.scaleLinear()
                .domain([this.props.yMax, 0])
                .range([ 0, 350 ]);

            svg.append("g")
                .call(d3.axisLeft(yAxis));


            const make_x_gridlines = () => {
                return d3.axisBottom(xAxis)
                    .ticks(5)
            };

            // add the X gridlines
            svg.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + 400 + ")")
                .call(make_x_gridlines()
                    .tickSize(-400)
                    .tickFormat("")
                );

            this.props.values.forEach(v => this.addChartLayer(svg, rows, xAxis, yAxis, v.value, v.color));
        }

        return result;
    }
}

export default Chart;