import React, {Component, Fragment} from 'react';

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButton from "../Buttons/RadioButton";

class TeamTestsView extends Component {

    render() {

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>

            <h4 style={style}>TeamTestView</h4>

            <TeamTestsPrScoreContainer socket={this.props.socket}>

              <RadioButton />
              <br />
              <TeamCompareChart svg_width={385} svg_height= {160}/>
          
            </TeamTestsPrScoreContainer>

        </Fragment>)
    }
}

export default TeamTestsView;