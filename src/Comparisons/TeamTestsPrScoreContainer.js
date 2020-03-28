import Container from "../Container";

export default class TeamTestsPrScoreContainer extends Container {

    constructor(props) {
        super(props);
        this.state.submissions = [];
    }

    getRoutingKey() {
        return 'calc.test.calcSummary';
    }

    mapStateToProps(state) {
        return {
            values: state.submissions,
            quarstotal: {q1: 695, median: 765, q3: 845, max: 1400, userScore: 832 },
            quarstype: {q1: 290, median: 320, q3: 360, max: 560 },
            quarslocation: {q1: 310, median: 340, q3: 390, max: 560 }
        };
    }
}