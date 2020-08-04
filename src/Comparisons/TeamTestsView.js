import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButtons from "../Buttons/RadioButtons";

//import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendHoriz from "../Components/Charts/LegendHoriz";
//import ComparisonChartContainer from "./ComparisonContainer";
import PassThruContainer from "./PassThruContainer";
import LocVsTypeChart from "../Components/Charts/LocVsTypeChart";
import PlayerDrills from "../Components/Charts/PlayerDrills";

class TeamTestsView extends Component {
    render() {
        let style = {marginLeft: '3.3rem'};

        const ChartHeader = props =>
                (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>

                    <h3>Team Test Scores</h3>

                    <PassThruContainer>
                        <LegendHoriz svg_width={490} textLabel={' '} />  
                    </PassThruContainer>
                    <div>
                    <RadioButtons
                        handleSelect={props.handleSelect}
                        options={ [{name:'Type',value:'type'},{name:'Location',value:'location'},{name:'Total',value:'total'}] }
                        initSelectedOption={'total'} />
                    </div>    
                </div>);

        return (<Fragment>
          <p style={style}>-- Page rendered from: TeamTestView.js --</p>
          <h2 style={style}>Pitch Recognition Analysis</h2>
          <div>
            <TeamTestsPrScoreContainer socket={this.props.socket}>
                
                <PlayerDrills />
                <ChartHeader/>
                  <TeamCompareChart svg_width={700} svg_height={400}/>
                  <LocVsTypeChart svg_height={500} svg_width={500} svg_border_opacity={0.5}/>
                  
            </TeamTestsPrScoreContainer>

          </div>
        </Fragment>)
        
    }
}

export default TeamTestsView;
