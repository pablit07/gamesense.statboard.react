import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import ComparisonContainer from "./ComparisonContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>

            <h4 style={style}>TeamTestView</h4>

            <TeamTestsPrScoreContainer socket={this.props.socket}>
              
              <p> -------- TeamCompareChart ----------</p>
              <TeamCompareChart svg_width={385} svg_height= {160}/>
          
            </TeamTestsPrScoreContainer>

        </Fragment>)
    }
}

export default TeamTestsView;