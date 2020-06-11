import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButtons from "../Buttons/RadioButtons";

import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import ComparisonChartContainer from "./ComparisonContainer";
import PassThruContainer from "./PassThruContainer";
import LocVsTypeChart from "../Components/Charts/LocVsTypeChart";
import PlayerDrills from "../Components/Charts/PlayerDrills";
import PlayerUseOverTimeContainer from "../DrillDetails/PlayerUseOverTimeContainer";
import BarChart from "../Components/Charts/BarChartSimple";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};

        const ChartHeader = props =>
                (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
                     <span><h3>  Player Drills Completed   </h3></span>

                    <h3>Team Test Scores</h3>
                    <PassThruContainer>
                        <LegendHoriz svg_width={490} textLabel={' '} />
                    </PassThruContainer>
                    <div>
                    <RadioButtons
                        handleSelect={props.handleSelect}
                        options={ [{name:'Week',value:'type'},{name:'Month',value:'location'},{name:'Year',value:'total'}] }
                        initSelectedOption={'total'} />
                    </div>    
                </div>);

        return (<Fragment>
          <p style={style}>-- Page rendered from: TeamTestView.js --</p>
          <h2 style={style}>Pitch Recognition Analysis</h2>
          <div>
          <PlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
              {/* <ChartHeader/> */}
                {/* <BarChart/> */}
            </PlayerUseOverTimeContainer>               
            <TeamTestsPrScoreContainer socket={this.props.socket}>
                <LocVsTypeChart svg_height={500} svg_width={500} svg_border_opacity={0.5}/>
                <ChartHeader/>
                  <TeamCompareChart svg_width={700} svg_height={400}/>
                <PlayerDrills svg_width={700} svg_height={400}/>
            </TeamTestsPrScoreContainer>
          */}
            <PlayerUseOverTimeContainer socket={this.props.socket} params={{rollUpType:"monthly"}} filters={null}> 
              <PlayerDrills svg_width={700} svg_height={400}/>
            </PlayerUseOverTimeContainer>

          </div>
        </Fragment>)
        
    }
}

export default TeamTestsView;
