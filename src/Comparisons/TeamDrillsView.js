
import React, {Component, Fragment} from 'react';

import PlayerDrillsNewChart from "../Components/Charts/PlayerDrillsNewChart";
import PlayerDrillsNewContainer from "../Comparisons/PlayerDrillsNewContainer";
import RadioButtons from "../Buttons/RadioButtons";

class TeamDrillsView extends Component {

    render() {

      const ChartHeader = props =>
      (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
           <span><h3>  Player Drills Completed   </h3></span>

          <div>
          <RadioButtons
              handleSelect={props.handleSelect}
              options={ [{name:'Week',value:'weekly'},{name:'Month',value:'monthly'},{name:'Year',value:'yearly'}] }
              initSelectedOption={'yearly'} />
          </div>    
      </div>);

        return (<Fragment>
          <p>-- Page rendered from: TeamDrillsView.js --</p>
          <div>
            <PlayerDrillsNewContainer socket={this.props.socket} params={{rollUpType:"yearly"}} filters={null}>
                <ChartHeader/>
                  <PlayerDrillsNewChart />
                  
            </PlayerDrillsNewContainer>
            
            
          </div>
        </Fragment>)
        
    }
}

export default TeamDrillsView;
