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
            values: {teamMin: 550, q1: 695, median: 765, q3: 845, teamMax: 960, max: 1400 }
        };
    }
}