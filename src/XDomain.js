import React from 'react';
import { render } from 'react-dom'
import CoachReport from './CoachReport/CoachReport';
import { create } from './Socket/Socket';
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";
import singlePlayerColumns from "./DrillDetails/columns_single";
import PlayerUseOverTime from './DrillDetails/PlayerUseOverTimeContainer';
import BarChart from "./DrillDetails/BarChart";


const DrillBreakdown = ({username, app, token}) => (
    <DrillDetailsTable socket={create(username, app, token)} rollUpType={"singleUserPitcherResponseType"}
                       columns={singlePlayerColumns} defaultPageSize={10} hideCheckboxes={true}/>);

const PlayerUseOverTimeWelcomeChart = ({username, app, token}, filters) => (
    <PlayerUseOverTime socket={create(username, app, token)} filters={filters}>
        <BarChart/>
    </PlayerUseOverTime>);

export {React, render, CoachReport, DrillBreakdown, PlayerUseOverTimeWelcomeChart};