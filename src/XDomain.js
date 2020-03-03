import React from 'react';
import { render } from 'react-dom'
import CoachReport from './CoachReport/CoachReport';
import { createSocket } from './Socket/Socket';
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";
import singlePlayerColumns from "./DrillDetails/columns_single";
import teamColumns from "./DrillDetails/columns_team";
import PlayerUseOverTime from './DrillDetails/PlayerUseOverTimeContainer';
import BarChart from "./Components/Charts/BarChart";
import PickList from "./Buttons/PickList";
import dispatch from './dispatch';
import actions from './actions';
import DrillDetailsContainer from "./DrillDetails/DrillDetailsContainer";
import {Table} from "./Components/Table";


const TimeSeriesPickList = ({dispatch}) => (<PickList
    name={"playerUseOverTime"}
    options={[{key:'Weekly',value:'weekly'}, {key:'Monthly',value:'monthly'}, {key:'Yearly',value:'yearly'}]}
    selectedValue={'monthly'}
    onLoad={dispatch.makePublisher(actions.TIMESERIES_PICKLIST_INIT)}
    onChange={dispatch.makePublisher(actions.TIMESERIES_PICKLIST_UPDATE)}/>);



const PlayerUseOverTimeWelcomeChart = ({username, app, token, userId}) => (
    <PlayerUseOverTime socket={createSocket(username, app, token)} dispatch={dispatch} filters={(userId?{user_id:userId}:null)}>
        <BarChart>
            <TimeSeriesPickList dispatch={dispatch}/>
        </BarChart>
    </PlayerUseOverTime>);



const weekDate = new Date();
const monthDate = new Date();
const quarterDate = new Date();
const halfDate = new Date();
weekDate.setDate(weekDate.getDate() - 7);
monthDate.setDate(monthDate.getDate() - 30);
quarterDate.setDate(quarterDate.getDate() - 90);
halfDate.setDate(halfDate.getDate() - 180);

const dateMap = {
    'week': weekDate,
    'month': monthDate,
    'quarter': quarterDate,
    'half': halfDate
};

const DateRangePickList = ({dispatch}) => {

    return (<PickList
    name={"drillBreakdown"}
    options={[{key:'Last 7 Days',value:'week'}, {key:'Last 30 Days',value:'month'}, {key:'Last 90 Days',value:'quarter'}, {key:'Last 180 Days',value:'half'}]}
    selectedValue={monthDate}
    onLoad={dispatch.makePublisher(actions.DATERANGE_PICKLIST_INIT)}
    onChange={dispatch.makePublisher(actions.DATERANGE_PICKLIST_UPDATE)}/>);
}



const DrillBreakdown = ({username, app, token, userId}) => {

    const maxDate = new Date();
    const minDate = monthDate;

    return (<DrillDetailsContainer
        socket={createSocket(username, app, token)}
        params={{rollUpType: userId ? "singleUserPitcherResponseType" : "teamResponseType"}}
        filters={(userId ? {user_id: userId, minDate, maxDate} : {minDate, maxDate})}
        columns={(userId ? singlePlayerColumns : teamColumns)}
        dispatch={dispatch}
        defaultPageSize={10}
        hideCheckboxes={true}
        dateMap>
            
        <div className={'topButtons'}>
            <DateRangePickList dispatch={dispatch}/>
        </div>

        <Table/>
    </DrillDetailsContainer>);
}





export {React, render, CoachReport, DrillBreakdown, PlayerUseOverTimeWelcomeChart};