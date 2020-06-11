// derived from TeamTestsView.js
/* built to demo that: <PlayerUseOverTimeContainer socket={this.props.socket} params={{rollUpType:"monthly"}} filters={null}> 
   does not export 'user_id' value, yet 'tyearly' and 'monthly' do */
import React, {Component, Fragment} from 'react';

import PlayerDrills from "../Components/Charts/PlayerDrills";
import PlayerUseOverTimeContainer from "../DrillDetails/PlayerUseOverTimeContainer";
import BarChart from "../Components/Charts/BarChart";

class TeamTestsView extends Component {

    render() {

        return (<Fragment>
          <p>-- Page rendered from: MonthlyBugView.js --</p>
          <div>
            <PlayerUseOverTimeContainer socket={this.props.socket} params={{rollUpType:"yearly"}} filters={null}>  
            </PlayerUseOverTimeContainer>

            {/* This call does not output 'user_id' in the console under "Here is the payload" - the other two do. */}
            <PlayerUseOverTimeContainer socket={this.props.socket} params={{rollUpType:"monthly"}} filters={null}>  
            </PlayerUseOverTimeContainer>

            <PlayerUseOverTimeContainer socket={this.props.socket} params={{rollUpType:"weekly"}} filters={null}>  
            </PlayerUseOverTimeContainer>

          </div>
        </Fragment>)
        
    }
}

export default TeamTestsView;
