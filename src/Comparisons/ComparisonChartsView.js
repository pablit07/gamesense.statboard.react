import React, {Component, Fragment} from 'react';
import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import ComparisonChartContainer from "./ComparisonContainer";


class ComparisonChartsView extends Component {

    render() {

        const now = new Date();
        const dateOneMonthAgo = new Date();
        const dateOneWeekAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);
        dateOneWeekAgo.setDate(now.getDate() - 7);

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>

            <h4 style={style}>Horizontal Quartile Comparisons</h4>

            <ComparisonChartContainer socket={this.props.socket}>
                <HorizontalQuartileChart svg_width={650} svg_height= {175}/>
                <HorizontalQuartileChart svg_width={350} svg_height= {175}/>
                <HorizontalQuartileChart svg_width={450} svg_height= {125}/>
                <HorizontalQuartileChart svg_width={280} svg_height= {115}/>
                <HorizontalQuartileChart svg_width={1050} svg_height= {175}/>
                <HorizontalQuartileChart svg_width={650} svg_height= {285}/><br />
            </ComparisonChartContainer>

        </Fragment>)
    }
}

export default ComparisonChartsView;