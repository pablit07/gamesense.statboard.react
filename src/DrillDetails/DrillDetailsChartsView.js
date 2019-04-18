import React, {Component, Fragment} from 'react';
import DrillDetailsTable from './DrillDetailsTable';
import DrillDetailsChart from './DrillDetailsChart';



class DrillDetailsChartView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>
            <h4 style={style}>All Users - % Correct for Pitch Type by Pitcher/Drill</h4>

            <DrillDetailsChart socket={this.props.socket}/>
        </Fragment>)
    }
}

export default DrillDetailsChartView;