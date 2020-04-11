import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButtons from "../Buttons/RadioButtons";

import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import ComparisonChartContainer from "./ComparisonContainer";
import PassThruContainer from "./PassThruContainer";
import LocVsTypeChart from "../Components/Charts/LocVsTypeChart";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};

        const ChartHeader = props =>
                (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
                    {/* <h3>Team Test Scores</h3> */}
                    <PassThruContainer>
                        <LegendHoriz svg_width={490} textLabel={' '} />
                    </PassThruContainer>
                    <RadioButtons
                        handleSelect={props.handleSelect}
                        options={ [{name:'Type',value:'type'},{name:'Location',value:'location'},{name:'Total',value:'total'}] }
                        initSelectedOption={'total'} />
                </div>);

        return (<Fragment>
          {/* <p style={style}>-- Page rendered from: TeamTestView.js --</p>
          <p style={style}>TeamCompareChart - Compare Type, Location and Total Scores</p> */}
          <div>                
            <TeamTestsPrScoreContainer socket={this.props.socket}>
                <LocVsTypeChart svg_height={400} svg_width={600} />
                <ChartHeader/>
              <TeamCompareChart svg_width={700} svg_height={400}/>
            </TeamTestsPrScoreContainer>
          </div>
        </Fragment>)
        
    }
}

export default TeamTestsView;
