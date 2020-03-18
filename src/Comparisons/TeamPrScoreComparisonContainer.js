import Container from "../Container";

export default class ComparisonChartContainer extends Container {

    constructor(props) {
        super(props);
        this.state.submissions = [];
    }

    getRoutingKey() {
        return 'calc.test.calcSummary';
    }

    mapStateToProps(state) {
        console.log(state.submissions);
        return {
            rows: state.submissions
        };
    }
}