import React from 'react';
import { render } from 'react-dom'
import CoachReport from './CoachReport/CoachReport';
import { create } from './Socket/Socket';
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";
import singlePlayerColumns from "./DrillDetails/columns_single";
import PlayerUseOverTime from './DrillDetails/PlayerUseOverTimeContainer';
import BarChart from "./DrillDetails/BarChart";
import PickList from "./Buttons/PickList";
import dispatch from './dispatch';
import actions from './actions';


const TimeSeriesPickList = ({dispatch}) => (<PickList
    options={[{key:'Weekly',value:'weekly'}, {key:'Monthly',value:'monthly'}, {key:'Yearly',value:'yearly'}]}
    selectedValue={'yearly'}
    onChange={dispatch.makePublisher(actions.PICKLIST_UPDATE)}/>);


const DrillBreakdown = ({username, app, token}) => (
    <DrillDetailsTable socket={create(username, app, token)} rollUpType={"singleUserPitcherResponseType"}
                       columns={singlePlayerColumns} defaultPageSize={10} hideCheckboxes={true}/>);


const PlayerUseOverTimeWelcomeChart = ({username, app, token, timeSeries}) => (
    <PlayerUseOverTime socket={create(username, app, token)} params={{rollUpType: (timeSeries || "yearly")}} dispatch={dispatch}>
        <BarChart>
            <TimeSeriesPickList dispatch={dispatch}/>
        </BarChart>
    </PlayerUseOverTime>);

export {React, render, CoachReport, DrillBreakdown, PlayerUseOverTimeWelcomeChart};