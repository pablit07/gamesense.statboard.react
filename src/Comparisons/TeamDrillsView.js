
import React, {Component, Fragment} from 'react';

import TeamDrillsOverTimeChart from "../Components/Charts/TeamDrillsOverTimeChart";
import TeamDrillsOverTimeContainer from "../DrillDetails/TeamDrillsOverTimeContainer";
// import BarChart from "../Components/Charts/BarChart";
// import BarChartSimplest from "../Components/Charts/BarChartSimplest";

class TeamTestsView extends Component {

    render() {

        return (<Fragment>
          <p>-- Page rendered from: TeamDrillsView.js --</p>
          <div>
          <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"yearly"}} filters={null}>  
                <TeamDrillsOverTimeChart/>
          </TeamDrillsOverTimeContainer>

          <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"monthly"}} filters={null}>
                <TeamDrillsOverTimeChart/> 
              {/* <BarChartSimplest/>  */}
          </TeamDrillsOverTimeContainer>

          <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"weekly"}} filters={null}>
                <TeamDrillsOverTimeChart/>  
          </TeamDrillsOverTimeContainer>
          
          </div>
        </Fragment>)
        
    }
}

export default TeamTestsView;
