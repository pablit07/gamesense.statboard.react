import React, {Component, Fragment} from 'react';
import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendVertical from "../Components/Charts/LegendVertical";
import LegendHoriz from "../Components/Charts/LegendHoriz";
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
            <hr/>
            <ComparisonChartContainer socket={this.props.socket}>
                <LegendHoriz  />
                <HorizontalQuartileChart svg_width={680} svg_height= {80}/>
            <hr/>
                <HorizontalQuartileChart svg_width={550} svg_height= {100}/>
                <LegendVertical />
            
            < hr/>
                <HorizontalQuartileChart svg_width={595} svg_height= {90}/><br/>
                <LegendHoriz  />
            < hr/>               
                <HorizontalQuartileChart svg_width={350} svg_height= {200} textColor={"red"}/>

            < hr/>   
            </ComparisonChartContainer>

        </Fragment>)
    }
}

export default ComparisonChartsView;