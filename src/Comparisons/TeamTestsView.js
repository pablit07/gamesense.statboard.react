import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButtons from "../Buttons/RadioButtons";

import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import ComparisonChartContainer from "./ComparisonContainer";
import PassThruContainer from "./PassThruContainer";
import LocVsTypeTeamChart from "../Components/Charts/LocVsTypeTeamChart";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};

        return (<Fragment>
          <p style={style}>-- Page rendered from: TeamTestView.js --</p>
          <p style={style}>Location VS. Type Score - Team Comparison Chart</p>
            <TeamTestsPrScoreContainer socket={this.props.socket}>
                {/* <LocVsTypeTeamChart svg_width={700} svg_height={500}/> */}
                <br />

                <div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
                    <PassThruContainer>
                      <LegendHoriz svg_width={590} />
                    </PassThruContainer>
                    <RadioButtons
                        handleSelect={this.props.handleSelect}
                        options={ [{name:'Type',value:'type'},{name:'Location',value:'location'},{name:'Total',value:'total'}] }
                        initSelectedOption={'total'} />
                </div>
              <br />
              <TeamCompareChart svg_width={700} svg_height={400}/>
            </TeamTestsPrScoreContainer>

        </Fragment>)
        
    }
}

export default TeamTestsView;
