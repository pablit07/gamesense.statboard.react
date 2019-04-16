import React, {Component, Fragment} from 'react';
import DrillDetails from './DrillDetails';


class DrillDetailsView extends Component {

    render() {
        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
            <h4 style={style}>Team - Correct Type</h4>
            <DrillDetails socket={this.props.socket} rollUpType={"teamPitcherResponseType"}/>
            <h4 style={style}>Overall - Correct Type</h4>
            <DrillDetails socket={this.props.socket} rollUpType={"globalPitcherResponseType"}/>
            <h4 style={style}>Team - Correct Location</h4>
            <DrillDetails socket={this.props.socket} rollUpType={"teamPitcherResponseLocation"}/>
            <h4 style={style}>Overall - Correct Location</h4>
            <DrillDetails socket={this.props.socket} rollUpType={"globalPitcherResponseLocation"}/>
        </Fragment>)
    }
}

export default DrillDetailsView;