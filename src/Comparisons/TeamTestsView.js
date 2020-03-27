import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButton from "../Buttons/RadioButton";

import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendVertical from "../Components/Charts/LegendVertical";
import ComparisonChartContainer from "./ComparisonContainer";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
          

            <h4 style={style}>TeamTestView</h4>

            <TeamTestsPrScoreContainer socket={this.props.socket}>
              <RadioButton />
              <br />
              <TeamCompareChart svg_width={385} svg_height= {160}/>
              <br />
          
            </TeamTestsPrScoreContainer>

          <ComparisonChartContainer socket={this.props.socket}>
            <HorizontalQuartileChart svg_width={400} svg_height= {80}/> 
            <LegendVertical  yPos={25}               svg_height= {80}/> 
          </ComparisonChartContainer>  

        </Fragment>)
    }
}

export default TeamTestsView;