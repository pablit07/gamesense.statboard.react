import React, {Component, Fragment} from 'react';
import ScatterPlotChart from './ScatterPlotChart';
import {PitchTypeBaseballLegend} from "./PitchTypeBaseballLegend";
import BarChart from "./BarChart";
import PlayerUseOverTimeContainer from "./PlayerUseOverTimeContainer";
import TeamPitchTypeCorrectResponseContainer from "./TeamPitchTypeCorrectResponseContainer";


class DrillDetailsChartView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
            <h4 style={style}>BAR CHART Single User - # Drills over Time</h4>

            <PlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
                <BarChart/>
            </PlayerUseOverTimeContainer>

            <h4 style={style}>Single User - # Drills over Time</h4>

            <PlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
                <ScatterPlotChart/>
            </PlayerUseOverTimeContainer>

            <h4 style={style}>All Users - % Correct for Pitch Type by Pitcher/Drill</h4>

            <TeamPitchTypeCorrectResponseContainer socket={this.props.socket} params={{rollUpType: 'globalPitcherResponseType'}}>
                <ScatterPlotChart>
                    <PitchTypeBaseballLegend/>
                </ScatterPlotChart>
            </TeamPitchTypeCorrectResponseContainer>

        </Fragment>)
    }
}

export default DrillDetailsChartView;