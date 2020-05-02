import Container from "../Container";

export default class TeamTestsPrScoreContainer extends Container {

    constructor(props) {
        super(props);
        this.state.submissions = [];
        this.state.selectedScore = 'total';
    }

    getRoutingKey() {
        return 'calc.test.calcSummary';
    }

    mapStateToProps(state) {
        const scoreType = state.selectedScore;
        const selectedPropName = `first_glance_${scoreType}_score`;

        let allData = state.submissions ? [...state.submissions] : [];
        let typeData = state.submissions ? [...state.submissions] : [];
        let locData = state.submissions ? [...state.submissions] : [];

        // for state-controlled components, pop and store the selected Average from `allData` last element.
        const average = allData.length ? allData.pop()[selectedPropName] : {};
        // Get the other average scores ...
        const typAvg = typeData.length ? typeData.pop()["first_glance_type_score"] : {};
        const locAvg = locData.length ? locData.pop()["first_glance_location_score"] : {};

        // important - dont sort beyond this point! will mix up graph
        allData = allData.map((r, i) => Object.assign(r, {thisScore: r[selectedPropName], index: i}));

        const quartiles = ({
                total: {q1: 695, median: 765, q3: 845, max: 1400},
                type: {q1: 290, median: 320, q3: 360, max: 560},
                location: {q1: 310, median: 340, q3: 390, max: 560}
            })[scoreType];


        return {
            scoreType,
            average,
            typAvg,
            locAvg,
            quartiles,
            values: allData,
            handleSelect: v => this.setState({selectedScore: v})
        };
    }
}