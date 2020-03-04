import Container from "../Container";

export default class ComparisonChartContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.streakSummary';
    }


    // TODO -remove, just for testing
    dataSource() {
        this.setState({submissions:[{}]});
    }

    mapStateToProps(state) {

        return {
            values: {q1: 695, median: 765, q3: 845, max: 1400, userScore: 1086 }
        };
    }
}