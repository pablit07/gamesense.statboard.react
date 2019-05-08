import Container from "../Container";

export default class TeamPitchTypeCorrectResponseContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.usageDetail';
    }

    mapStateToProps(state) {
        let defaultProps = {
            name: "name",
            values: [{
                value: 'pitchType_Fastball',
                color: "red"
            }, {
                value: 'pitchType_Slider',
                color: 'green'
            }, {
                value: 'pitchType_Curveball',
                color: "orange"
            }, {
                value: 'pitchType_Cutter',
                color: "blue"
            }, {
                value: 'pitchType_Changeup',
                color: "purple"
            }],
            yLabel: "% Correct"
        };

        state.submissions = state.submissions.rows || [];

        let pitchers = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next[defaultProps.name])) {
                accum.push(next[defaultProps.name]);
            }
            return accum;
        }, []).sort();

        return {
            ...defaultProps,
            ...state,
            xValues: pitchers,
            yMax: 100
        };
    }
}