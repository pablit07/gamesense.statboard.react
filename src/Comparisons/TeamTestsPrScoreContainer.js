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
            values: state.submissions
        };
    }
}