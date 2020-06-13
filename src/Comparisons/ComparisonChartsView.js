import React, {Component, Fragment} from 'react';
import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import LegendVertical from "../Components/Charts/LegendVertical";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import GroupedBarChart from "../Components/Charts/GroupedBarChart";
import ComparisonContainer from "./ComparisonContainer";


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
            
            <ComparisonContainer socket={this.props.socket}>

            < hr/> 
                <LegendHoriz  tx = {50} ty = {10} />
                <HorizontalQuartileChart tx = {25} svg_width={680} svg_height= {100} userScore = {855}/>
                <hr/>
                <HorizontalQuartileChart tx = {25} ty = {-5} svg_width={280} svg_height= {85} userScore = {855}/>
                <hr/>
                <HorizontalQuartileChart tx = {25} svg_width={480} svg_height= {130} userScore = {855}/>
                <LegendVertical tx = {70} ty = {-30}  />
            <hr/>
            </ComparisonContainer>

        </Fragment>)
    }
}

export default ComparisonChartsView;