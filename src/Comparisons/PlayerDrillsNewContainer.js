import Container from "../Container";

export default class PlayerDrillsNewContainer extends Container {

    constructor(props) {
        super(props);
        this.state.submissions = [];
        this.state.selectedTimePeriod = 'weekly';
    }

    getRoutingKey() {
        return 'calc.drill.completionSummary';
    }

    mapStateToProps(state) {
        const scoreType = state.selectedTimePeriod;
        const selectedPropName = `first_glance_${scoreType}_score`;

        let allData = state.submissions ? [...state.submissions] : [];
    
        // for state-controlled components, pop and store the selected Average from `allData` last element.
        const average = allData.length ? allData.pop()[selectedPropName] : {};
     

        // important - dont sort beyond this point! will mix up graph
        allData = allData.map((r, i) => Object.assign(r, {thisScore: r[selectedPropName], index: i}));

        
        return {
            scoreType,
            average,

            values: allData,
            handleSelect: v => this.setState({selectedTimePeriod: v})
        };
    }
}