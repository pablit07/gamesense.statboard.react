import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButtons from "../Buttons/RadioButtons";

import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import ComparisonChartContainer from "./ComparisonContainer";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};

        function handleSelect(v) {
            alert('it worked: ' + v)
        };

        return (<Fragment>

            <h4 style={style}>TeamTestView</h4>

            <TeamTestsPrScoreContainer socket={this.props.socket}>
              <RadioButtons options={ [{name:'Type', value:'type'}, {name:'Location', value:'location'}, {name:'Total', value:'total'}] } initSelectedOption={'type'} handleSelect={handleSelect} />
              <br />
              <LegendHoriz />
              <TeamCompareChart svg_width={785} svg_height={450}/>   
            </TeamTestsPrScoreContainer>

            <ComparisonChartContainer socket={this.props.socket}>
              <HorizontalQuartileChart  svg_width={595} svg_height= {90}/>
              
            </ComparisonChartContainer>
            <br />
            <h1>=======>       Yay! </h1>

        </Fragment>)
        
    }
}

export default TeamTestsView;
