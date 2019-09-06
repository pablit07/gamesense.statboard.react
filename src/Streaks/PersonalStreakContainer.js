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

        state.submissions = [{day:1, count:0},{day:2, count:0},{day:3, count:0},{day:4, count:0},{day:5, count:0},{day:6, count:0},{day:7, count:0}];

        return {
            ...defaultProps,
            ...state,
            xValues: state.submissions.map(r => r.day),
            yMax: 50,
            startDate: this.props.startDate

        };
    }
}