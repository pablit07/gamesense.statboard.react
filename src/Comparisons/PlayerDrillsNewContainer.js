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
        let defaultProps = {name: "date_format", values: [{value: "count", color: "#4D9360"}] };
        const timePeriod = state.selectedTimePeriod;

        // Sort state.submissions chronologically. Gets all submissions to a max of 12.
        state.submissions = state.submissions.slice(Math.max(state.submissions.length - 24, 0))
        .sort((l, r) => {
            // sort numerically
            if (l.year !== r.year) {
                return l.year - r.year; 
            } else {
                return l.month - r.month;
            }
        });

        let allData = state.submissions ? [...state.submissions] : [];
     
        // important - dont sort beyond this point! will mix up graph
        // This assigns (copies) the value of 'count' to a new variable 'count'
        // Why is this necessary? Without it, only on bar is rendered. Why?
        allData = allData.map((r, i) => Object.assign(r, {count: r['count'], index: i}));
        console.log('============ sorted allData ===============');
        console.log (allData);
        
        return {
            timePeriod,
            values: allData,
            handleSelect: v => this.setState({selectedTimePeriod: v})
        };
    }
}