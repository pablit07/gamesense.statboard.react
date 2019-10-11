import React from 'react';
import { render } from 'react-dom'
import CoachReport from './CoachReport/CoachReport';
import { createSocket } from './Socket/Socket';
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";
import singlePlayerColumns from "./DrillDetails/columns_single";
import teamColumns from "./DrillDetails/columns_team";
import PlayerUseOverTime from './DrillDetails/PlayerUseOverTimeContainer';
import BarChart from "./Components/BarChart";
import PickList from "./Buttons/PickList";
import dispatch from './dispatch';
import actions from './actions';
import DrillDetailsContainer from "./DrillDetails/DrillDetailsContainer";
import {Table} from "./Components/Table";


const TimeSeriesPickList = ({dispatch}) => (<PickList
    name={"playerUseOverTime"}
    options={[{key:'Weekly',value:'weekly'}, {key:'Monthly',value:'monthly'}, {key:'Yearly',value:'yearly'}]}
    selectedValue={'monthly'}
    onLoad={dispatch.makePublisher(actions.PICKLIST_INIT)}
    onChange={dispatch.makePublisher(actions.PICKLIST_UPDATE)}/>);


const DrillBreakdown = ({username, app, token, userId}) => {

    const maxDate = new Date();
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 31);

    return (<DrillDetailsContainer
        socket={createSocket(username, app, token)}
        params={{rollUpType: userId ? "singleUserPitcherResponseType" : "teamResponseType"}}
        filters={(userId ? {user_id: userId, minDate, maxDate} : {minDate, maxDate})}
        columns={(userId ? singlePlayerColumns : teamColumns)}
        defaultPageSize={10}
        hideCheckboxes={true}>

        <Table/>
    </DrillDetailsContainer>);
}


const PlayerUseOverTimeWelcomeChart = ({username, app, token, userId}) => (
    <PlayerUseOverTime socket={createSocket(username, app, token)} dispatch={dispatch} filters={(userId?{user_id:userId}:null)}>
        <BarChart>
            <TimeSeriesPickList dispatch={dispatch}/>
        </BarChart>
    </PlayerUseOverTime>);

export {React, render, CoachReport, DrillBreakdown, PlayerUseOverTimeWelcomeChart};