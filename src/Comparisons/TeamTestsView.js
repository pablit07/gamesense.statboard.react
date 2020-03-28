import React, { Component, Fragment } from "react";

import TeamTestsPrScoreContainer from "./TeamTestsPrScoreContainer";
import TeamCompareChart from "../Components/Charts/TeamCompareChart";
import RadioButton from "../Buttons/RadioButton";

import HorizontalQuartileChart from "../Components/Charts/HorizontalQuartileChart";
import LegendHoriz from "../Components/Charts/LegendHoriz";
import ComparisonChartContainer from "./ComparisonContainer";

class TeamTestsView extends Component {
  render() {
    let style = { marginLeft: "3.3rem" };
    return (
      <Fragment>
        <h4 style={style}>TeamTestView</h4>

        <TeamTestsPrScoreContainer socket={this.props.socket}>
          <RadioButton />
          <br />
          <LegendHoriz />
          <TeamCompareChart svg_width={685} svg_height={400} />
          <br />
        </TeamTestsPrScoreContainer>

        <ComparisonChartContainer socket={this.props.socket}>
          <HorizontalQuartileChart svg_width={700} svg_height={100} />
        </ComparisonChartContainer>
      </Fragment>
    );
  }
}

export default TeamTestsView;
