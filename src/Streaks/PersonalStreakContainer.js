import Container from "../Container";

export default class PersonalStreakContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.streakSummary';
    }


    // TODO -remove, just for testing
    dataSource() {
        this.setState({submissions:[{}]});
    }

    mapStateToProps(state) {
        let defaultProps = {
            name: "day",
            values: [{
                value: 'count',
                color: "turquoise"
            }]
        };

        // TODO map this
        state.submissions = [{day:1, inStreak:true},{day:2, inStreak:false},{day:3, inStreak:false},{day:4, inStreak:false},{day:5, inStreak:false},{day:6, inStreak:true},{day:7, inStreak:false},{day:8, inStreak:false},{day:9, inStreak:false},{day:10, inStreak:false},{day:11, inStreak:false},{day:12, inStreak:true}];

        return {
            ...defaultProps,
            ...state,
            xValues: state.submissions.map(r => r.day),
            yMax: 50,
            startDate: this.props.startDate

        };
    }
}