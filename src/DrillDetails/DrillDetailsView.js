import React, {Component, Fragment} from 'react';
import DrillDetailsTable from './DrillDetailsTable';
import DrillDetailsChart from './DrillDetailsChart';



class DrillDetailsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
            <h4 style={style}>Team - Correct Type</h4>
            <DrillDetailsTable socket={this.props.socket} rollUpType={"teamPitcherResponseType"}/>
            <h4 style={style}>Overall - Correct Type</h4>
            <DrillDetailsTable socket={this.props.socket} rollUpType={"globalPitcherResponseType"}/>
            <h4 style={style}>Team - Correct Location</h4>
            <DrillDetailsTable socket={this.props.socket} rollUpType={"teamPitcherResponseLocation"}/>
            <h4 style={style}>Overall - Correct Location</h4>
            <DrillDetailsTable socket={this.props.socket} rollUpType={"globalPitcherResponseLocation"}/>
        </Fragment>)
    }
}

export default DrillDetailsView;