import React from 'react';
import { render } from 'react-dom'
import CoachReport from './CoachReport/CoachReport';
import { create } from './Socket/Socket';
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";


const DrillBreakdown = (username, app, token) =>
	(<DrillDetailsTable socket={create(username, app, token)} rollUpType={"teamPitcherResponseType"}/>);

export {React, render, CoachReport, DrillBreakdown};