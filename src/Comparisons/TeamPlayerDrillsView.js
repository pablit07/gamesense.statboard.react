import React, {Component, Fragment} from 'react';

import TeamPlayerDrillsChart from "../Components/Charts/TeamPlayerDrillsChart";
import TeamPlayerDrillsContainer from "../Comparisons/TeamPlayerDrillsContainer";
import PickList from "../Buttons/PickList";
import actions from '../actions';
import dispatch from '../dispatch';


class TeamPlayerDrillsView extends Component {

    render() {

      const TimeSeriesPickList = ({dispatch}) => (<PickList
        name={"teamPlayerDrills"}
        options={[{key:'Weekly',value:'weekly'}, {key:'Monthly',value:'monthly'}, {key:'Yearly',value:'yearly'}]}
        selectedValue={'monthly'}
        onLoad={dispatch.makePublisher(actions.TIMESERIES_PICKLIST_INIT)}
        onChange={dispatch.makePublisher(actions.TIMESERIES_PICKLIST_UPDATE)}/>);


        return (<Fragment>
          <p>-- Page rendered from: TeamDrillsView.js --</p>
          <div style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center'}}>  
            <h2> Player Drills Completed</h2>

            <TeamPlayerDrillsContainer socket={this.props.socket} dispatch={dispatch} filters={null} >  
              <TimeSeriesPickList dispatch={dispatch}/>
              <TeamPlayerDrillsChart/>
            </TeamPlayerDrillsContainer>

          </div>
        </Fragment>)   
    }
}

export default TeamPlayerDrillsView;
