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
        const scoreType = this.state.selectedScore;
        const selectedPropName = `first_glance_${scoreType}_score`;

        // ToDo: Put this in a function in a different file ...
        // split up data into {first_name: "", last_name: "", score: "<relevant_score>"}
        // var locationData = [];
        // var typeData = [];
        // var totalData = [];

        let allData = state.submissions || [];

        // pop and store the "Team Average" - last element
        const average = allData.length ? allData.pop()[selectedPropName] : {};

        allData = allData.map(r => Object.assign(r, {thisScore: r[selectedPropName]}));

        const quartiles = ({
                total: {q1: 695, median: 765, q3: 845, max: 1400, userScore: 832},
                type: {q1: 290, median: 320, q3: 360, max: 560},
                location: {q1: 310, median: 340, q3: 390, max: 560}
            })[scoreType];


        return {
            scoreType,
            average,
            quartiles,
            values: allData,
            handleSelect: v => this.setState({selectedScore: v})
        };
    }
}