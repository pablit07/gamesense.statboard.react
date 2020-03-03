import React, {Component, Fragment} from 'react';
import BarChart from "../Components/Charts/BarChart";
import CalendarBubbleChart from "../Components/Charts/CalendarBubbleChart";
import OverallStreaksContainer from "./OverallStreaksContainer";
import PersonalStreakContainer from "./PersonalStreakContainer";


class StreaksChartView extends Component {

    render() {

        const now = new Date();
        const dateOneMonthAgo = new Date();
        const dateOneWeekAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);
        dateOneWeekAgo.setDate(now.getDate() - 7);

        let style = {marginLeft: '3.3rem'};
        return (<Fragment>

            <h4 style={style}>Personal Streak for coachkohlhoff</h4>

            <PersonalStreakContainer socket={this.props.socket} filters={{user_id:150,startDate:{"$gte":dateOneWeekAgo}}} startDate={dateOneWeekAgo}>
                <CalendarBubbleChart/>
            </PersonalStreakContainer>

            <h4 style={style}>Streaks By Days >= 2 days</h4>

            <OverallStreaksContainer socket={this.props.socket} filters={{days:{"$gte":2}}}>
                <BarChart/>
            </OverallStreaksContainer>




        </Fragment>)
    }
}

export default StreaksChartView;