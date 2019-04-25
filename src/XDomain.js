import React from 'react';
import { render } from 'react-dom'
import Home from './Home/Home';
import TestSubmissions from './TestSubmissions/TestSubmissions';
import DrillUsage from './DrillUsage/DrillUsage';
import CoachReport from './CoachReport/CoachReport';
import { create } from './Socket/Socket';
import DrillDetailsView from "./DrillDetails/DrillDetailsView";
import PageContainer from "./PageContainer";
import DrillDetailsChartView from "./DrillDetails/DrillDetailsChartsView";
import DrillDetailsTable from "./DrillDetails/DrillDetailsTable";
import singlePlayerColumns from "./DrillDetails/columns_single";


const DrillBreakdown = ({username, app, token}) => (<DrillDetailsTable socket={create(username, app, token)} rollUpType={"singleUserPitcherResponseType"} columns={singlePlayerColumns}/>);

export {React, render, CoachReport, DrillBreakdown};