import React, {Component, Fragment} from 'react';
import DrillDetailsTable from './DrillDetailsTable';
// import ScatterPlotChart from './ScatterPlotChart';
import Toggle from '../Components/toggleRPC';




class DrillDetailsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem', cursor: 'pointer'};
        return (<Fragment>

            {/* Team - Correct Type*/}
            <Toggle>
                {({on, toggle}) => (
                    <div>

                        <h4 style={style} onClick={toggle}><li>Team - Correct Type</li></h4>
                        {on && <DrillDetailsTable socket={this.props.socket} rollUpType={""}/>}
                    </div>
                )}
            </Toggle>

            {/* Team - Correct Type*/}
            <Toggle>
            {({on, toggle}) => (
                <div>

                <h4 style={style} onClick={toggle}><li>Team - Correct Type</li></h4>
                {on && <DrillDetailsTable socket={this.props.socket} rollUpType={"teamPitcherResponseType"}/>}
                </div>
                )}
            </Toggle>

            {/* Overall - Correct Type*/}
            <Toggle>
            {({on, toggle}) => (
                <div>
                <h4 style={style} onClick={toggle}><li>Overall - Correct Type</li></h4>
                {on && <DrillDetailsTable socket={this.props.socket} rollUpType={"globalPitcherResponseType"}/>}
                </div>
                )}
            </Toggle>

            {/* Team - Correct Location*/}
            <Toggle>
            {({on, toggle}) => (
                <div>
                <h4 style={style} onClick={toggle}><li>Team - Correct Location</li></h4>
                {on && <DrillDetailsTable socket={this.props.socket} rollUpType={"teamPitcherResponseLocation"}/>}
                </div>
                )}
            </Toggle>

            {/* Overall - Correct Location*/}
            <Toggle>
            {({on, toggle}) => (
                <div>
                <h4 style={style} onClick={toggle}><li>Overall - Correct Location</li></h4>
                {on && <DrillDetailsTable socket={this.props.socket} rollUpType={"globalPitcherResponseLocation"}/>}
                </div>
                )}
            </Toggle>

        </Fragment>)
    }
}

export default DrillDetailsView;