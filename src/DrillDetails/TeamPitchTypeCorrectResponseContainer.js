import Container from "../Container";

export default class TeamPitchTypeCorrectResponseContainer extends Container {
    getRoutingKey() {
        return 'calc.drill.usageDetail';
    }

    mapStateToProps(state) {
        let defaultProps = {
            name: "name",
            values: (this.socket && this.socket.authToken.app != 'SB' ? [{
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
            }] : [{
                value: 'pitchType_Fastball',
                color: "red"
            }, {
                value: 'pitchType_Rise',
                color: 'green'
            }, {
                value: 'pitchType_Curveball',
                color: "orange"
            }, {
                value: 'pitchType_Drop',
                color: "blue"
            }, {
                value: 'pitchType_Knuckle',
                color: "purple"
            }, {
                value: 'pitchType_Screw',
                color: "black"
            }]),
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