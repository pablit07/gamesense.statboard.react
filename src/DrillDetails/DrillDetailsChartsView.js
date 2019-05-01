import React, {Component, Fragment} from 'react';
import ScatterPlotChart from './ScatterPlotChart';
import {PitchTypeBaseballLegend} from "./PitchTypeBaseballLegend";
import Container from '../Container';
import BarChart from "./BarChart";



class SinglePlayerUseOverTimeContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.completionSummary';
    }

    mapStateToProps(state) {
        let defaultProps = {name:"date", values:[{value:"count",color:"black"}], yLabel:"# Drills"};

        let dates = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next[defaultProps.name])) {
                accum.push(next[defaultProps.name]);
            }
            return accum;
        }, []).sort();

        return {
            ...state,
            ...defaultProps,
            xValues: dates,
            yMax: state.submissions.reduce((accum, next) => {
                return (next[defaultProps.values[0].value] > accum) ? next[defaultProps.values[0].value] : accum;
            }, 0)
        };
    }
}

class TeamPitchTypeCorrectResponseContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.usageDetail';
    }

    mapStateToProps(state) {
        let defaultProps = {
            name: "name",
            values: [{
                value: 'pitchType_Fastball',
                color: "red"
            }, {
                value: 'pitchType_Slider',
                color: 'green'
            }, {
                value: 'pitchType_Curveball',
                color: "orange"
            }, {
                value: 'pitchType_Cutter',
                color: "blue"
            }, {
                value: 'pitchType_Changeup',
                color: "purple"
            }],
            yLabel: "% Correct"
        };

        state.submissions = state.submissions.rows || [];

        let pitchers = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next[defaultProps.name])) {
                accum.push(next[defaultProps.name]);
            }
            return accum;
        }, []).sort();

        return {
            ...defaultProps,
            ...state,
            xValues: pitchers,
            yMax: 100
        };
    }
}

class DrillDetailsChartView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
            <h4 style={style}>BAR CHART Single User - # Drills over Time</h4>

            <SinglePlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
                <BarChart/>
            </SinglePlayerUseOverTimeContainer>

            <h4 style={style}>Single User - # Drills over Time</h4>

            <SinglePlayerUseOverTimeContainer socket={this.props.socket} filters={{user_id:150/* TODO replace hardcoded */}}>
                <ScatterPlotChart/>
            </SinglePlayerUseOverTimeContainer>

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