import React, {Component, Fragment} from 'react';
import ScatterPlotChart from '../Components/Charts/ScatterPlotChart';
import {PitchTypeBaseballLegend} from "./PitchTypeBaseballLegend";
import BarChart from "../Components/Charts/BarChart";
import PlayerUseOverTimeContainer from "./PlayerUseOverTimeContainer";
import TeamPitchTypeCorrectResponseContainer from "./TeamPitchTypeCorrectResponseContainer";
import {PitchTypeSoftballLegend} from "./PitchTypeSoftballLegend";


class DrillDetailsChartView extends Component {

    render() {

        let baseballLegend = (<PitchTypeBaseballLegend/>);
        let softballLegend = (<PitchTypeSoftballLegend/>);

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
            <h4 style={style}>coachkohlhoff - # Drills over Time</h4>

            <PlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
                <BarChart/>
            </PlayerUseOverTimeContainer>

            <h4 style={style}>coachkohlhoff - # Drills over Time</h4>

            <PlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
                <ScatterPlotChart/>
            </PlayerUseOverTimeContainer>

            <h4 style={style}>All Users - % Correct for Pitch Type by Pitcher/Drill</h4>

            <TeamPitchTypeCorrectResponseContainer socket={this.props.socket} params={{rollUpType: 'globalPitcherResponseType'}}>
                <ScatterPlotChart>
                    {this.props.socket.authToken && this.props.socket.authToken.app != 'SB' ? baseballLegend : softballLegend}
                </ScatterPlotChart>
            </TeamPitchTypeCorrectResponseContainer>

        </Fragment>)
    }
}

export default DrillDetailsChartView;