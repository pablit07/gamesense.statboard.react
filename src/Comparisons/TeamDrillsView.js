
import React, {Component, Fragment} from 'react';

import TeamDrillsOverTimeChart from "../Components/Charts/TeamDrillsOverTimeChart";
import TeamDrillsOverTimeContainer from "../Comparisons/TeamDrillsOverTimeContainer";
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
            <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"yearly"}} filters={null}>
                  <TeamDrillsOverTimeChart/>
                  <ChartHeader/>
            </TeamDrillsOverTimeContainer>
            {/*  
            <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"monthly"}} filters={null}>
                  <TeamDrillsOverTimeChart/>  
            </TeamDrillsOverTimeContainer>

            <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"weekly"}} filters={null}>
                  <TeamDrillsOverTimeChart/>  
            </TeamDrillsOverTimeContainer>
            */}
            
          </div>
        </Fragment>)
        
    }
}

export default TeamDrillsView;
