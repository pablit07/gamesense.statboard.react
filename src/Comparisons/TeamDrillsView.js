import React, {Component, Fragment} from 'react';

import PlayerDrillsNewChart from "../Components/Charts/PlayerDrillsNewChart";
import PlayerDrillsNewContainer from "../Comparisons/PlayerDrillsNewContainer";
import PickList from "../Buttons/PickList";
import actions from '../actions';
import dispatch from '../dispatch';

import PlayerUseOverTime from '../DrillDetails/PlayerUseOverTimeContainer';
import BarChart from "../Components/Charts/BarChart";

class TeamDrillsView extends Component {

    render() {

      const TimeSeriesPickList = ({dispatch}) => (<PickList
        name={"playerUseOverTime"}
        options={[{key:'Weekly',value:'weekly'}, {key:'Monthly',value:'monthly'}, {key:'Yearly',value:'yearly'}]}
        selectedValue={'monthly'}
        onLoad={dispatch.makePublisher(actions.TIMESERIES_PICKLIST_INIT)}
        onChange={dispatch.makePublisher(actions.TIMESERIES_PICKLIST_UPDATE)}/>);


        return (<Fragment>
          <p>-- Page rendered from: TeamDrillsView.js --</p>
          <div style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center'}}>  
            <h2> Player Drills Completed</h2>

            {/* <PlayerDrillsNewContainer socket={this.props.socket} params={{rollUpType:"yearly"}} filters={null}> */}
            <PlayerDrillsNewContainer socket={this.props.socket} dispatch={dispatch} filters={null} >  
              <TimeSeriesPickList dispatch={dispatch}/>
              <PlayerDrillsNewChart/>
            </PlayerDrillsNewContainer>

          </div>
        </Fragment>)   
    }
}

export default TeamDrillsView;
