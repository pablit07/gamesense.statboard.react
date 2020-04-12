import React, {Component, Fragment} from 'react';
import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import LegendVertical from "../Components/Charts/LegendVertical";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import GroupedBarChart from "../Components/Charts/GroupedBarChart";
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

            < hr/> 
                <LegendHoriz  />
                <HorizontalQuartileChart svg_width={680} svg_height= {80}/>
            <hr/>
                {/* Paul, the below 2 `svg_height` vars must match. Not sure best way to implement/force that. 
                    yPos moves the Legend items up and down in its own svg. */}
                <HorizontalQuartileChart svg_width={550} svg_height= {100}/> 
                <LegendVertical  yPos={25}               svg_height= {100}/>  
            
            < hr/>
                {/* Paul, the below 2 `svg_width` vars should match also.  
                    xPos moves the Legend items left (neg) and right (pos) in its own svg. 
                    spacing is the width between the Legend elements (90 default)*/}
                <HorizontalQuartileChart  svg_width={595} svg_height= {90}/><br/>
                <LegendHoriz  xPos={-25} svg_width={595} spacing={85}/>
            < hr/>               
                <HorizontalQuartileChart svg_width={350} svg_height= {200} textColor={"red"}/>
                <LegendVertical  yPos={25}               svg_height= {200}/>
            < hr/>

            <p>"--------- GroupedBarChart -----------"</p>
            <GroupedBarChart svg_width={385} svg_height= {160}/>

            </ComparisonChartContainer>

        </Fragment>)
    }
}

export default ComparisonChartsView;