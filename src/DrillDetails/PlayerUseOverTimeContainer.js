import Container from "../Container";

export default class PlayerUseOverTimeContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.completionSummary';
    }

    mapStateToProps(state) {
        let defaultProps = {name: "date", values: [{value: "count", color: "black"}], yLabel: "# Drills"};

        let dates = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next[defaultProps.name])) {
                accum.push(next[defaultProps.name]);
            }
            return accum;
        }, []).sort();

        return {
            ...state,
            ...defaultProps,
            xValues: dates,
            yMax: state.submissions.reduce((accum, next) => {
                return (next[defaultProps.values[0].value] > accum) ? next[defaultProps.values[0].value] : accum;
            }, 0)
        };
    }
}

