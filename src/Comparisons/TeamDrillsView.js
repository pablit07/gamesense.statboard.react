
import React, {Component, Fragment} from 'react';

import PlayerDrillsNewChart from "../Components/Charts/PlayerDrillsNewChart";
import PlayerDrillsNewContainer from "../Comparisons/PlayerDrillsNewContainer";
import RadioButtons from "../Buttons/RadioButtons";
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

    
        const weekDate = new Date();
        const monthDate = new Date();
        const quarterDate = new Date();
        const halfDate = new Date();
        weekDate.setDate(weekDate.getDate() - 7);
        monthDate.setDate(monthDate.getDate() - 30);
        quarterDate.setDate(quarterDate.getDate() - 90);
        halfDate.setDate(halfDate.getDate() - 180);

        return (<Fragment>
          <p>-- Page rendered from: TeamDrillsView.js --</p>
          <div style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center'}}>  
            <h2> Player Drills Completed</h2>
            <PlayerDrillsNewContainer socket={this.props.socket} dispatch={dispatch} filters={null}>  
              <TimeSeriesPickList dispatch={dispatch}/>
              <PlayerDrillsNewChart/>
            </PlayerDrillsNewContainer>
          </div>
        </Fragment>)
        
    }
}

export default TeamDrillsView;
