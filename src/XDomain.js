import React from 'react';
import { render } from 'react-dom'
import CoachReport from './CoachReport/CoachReport';
import { create } from './Socket/Socket';
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";
import singlePlayerColumns from "./DrillDetails/columns_single";


const DrillBreakdown = ({username, app, token}) => (
    <DrillDetailsTable socket={create(username, app, token)} rollUpType={"singleUserPitcherResponseType"}
                       columns={singlePlayerColumns} defaultPageSize={10} hideCheckboxes={true}/>);

export {React, render, CoachReport, DrillBreakdown};