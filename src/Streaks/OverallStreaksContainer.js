import Container from "../Container";

export default class OverallStreaksContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.streakSummary';
    }

    mapStateToProps(state) {
        let defaultProps = {
            name: "days",
            values: [{
                value: 'count',
                color: "turquoise"
            }],
            yLabel: "# Users"
        };

        state.submissions = state.submissions || [];

        let days = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next["days"])) {
                accum.push(next["days"]);
            }
            return accum;
        }, []).sort();

        return {
            ...defaultProps,
            ...state,
            xValues: days,
            yMax: 50
        };
    }
}