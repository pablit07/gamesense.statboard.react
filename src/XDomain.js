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
import HorizontalQuartile from "./Components/Charts/HorizontalQuartileChart";
import {Table} from "./Components/Table";
import PassThruContainer from "./Comparisons/PassThruContainer";
import TeamTestsPrScoreContainer from "./Comparisons/TeamTestsPrScoreContainer";
import RadioButtons from "./Buttons/RadioButtons";
import LegendHoriz from "./Components/Charts/LegendHoriz";
import TeamCompareChart from "./Components/Charts/TeamCompareChart";
import LocVsTypeChart from "./Components/Charts/LocVsTypeChart";
import TeamPlayerDrillsContainer from "./Comparisons/TeamPlayerDrillsContainer";
import TeamPlayerDrillsChart from "./Components/Charts/TeamPlayerDrillsChart";


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
};


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
        <LegendHoriz svg_width={490} textLabel={' '} />
    </DrillDetailsContainer>);
};


const HorizontalQuartileChart = ({q1, median, q3, max, userScore, textColor}) => {
    return (<PassThruContainer values={{q1, median, q3, max, userScore}} textColor={textColor} svg_width={510} svg_height={110}>
                <HorizontalQuartile/>
            </PassThruContainer>)
};


const TeamTestsPrScoreWelcomeChart = ({username, app, token}) => {

    const ChartHeader = props =>
         (<div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
            <PassThruContainer>
                <LegendHoriz svg_width={490} textLabel={' '} />
            </PassThruContainer>
            <RadioButtons
                handleSelect={props.handleSelect}
                options={ [{name:'Type',value:'type'},{name:'Location',value:'location'},{name:'Total',value:'total'}] }
                initSelectedOption={'total'} />
        </div>);

    return (<div style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                <TeamTestsPrScoreContainer socket={createSocket(username, app, token)}>
                <ChartHeader/>
                <TeamCompareChart svg_width={785} svg_height={450}/>
                </TeamTestsPrScoreContainer>
            </div>);
};

const TeamLocVsTypeChart = ({username, app, token}) => {

    return (<div style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                <TeamTestsPrScoreContainer socket={createSocket(username, app, token)}>
                    <LocVsTypeChart svg_height={500} svg_width={500} svg_border_opacity={0.5}/>
                </TeamTestsPrScoreContainer>
            </div>);
};


const TeamPlayerDrills = ({username, app, token, userId}) => {
    return (<div style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
            <TeamPlayerDrillsContainer socket={createSocket(username, app, token)} dispatch={dispatch} filters={null}>
                    <TimeSeriesPickList dispatch={dispatch}/>
                <TeamPlayerDrillsChart username={username} app={app} token={token}/>
            </TeamPlayerDrillsContainer>
            </div>);
}


export {
    React,
    render,
    CoachReport,
    DrillBreakdown,
    PlayerUseOverTimeWelcomeChart,
    HorizontalQuartileChart,
    TeamTestsPrScoreWelcomeChart,
    TeamPlayerDrills,
    TeamLocVsTypeChart
};