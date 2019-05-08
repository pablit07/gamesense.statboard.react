import Container from "../Container";
import actions from "../actions";
import * as d3 from 'd3';

export default class PlayerUseOverTimeContainer extends Container {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleInit = this.handleInit.bind(this);
        if (this.props.dispatch) {
            this.props.dispatch.on(actions.PICKLIST_UPDATE, this.handleChange);
            this.props.dispatch.on(actions.PICKLIST_INIT, this.handleInit);
        }
    }

    getRoutingKey() {
        return 'calc.drill.completionSummary';
    }

    async handleChange(timeSeries) {
        await this.setState({
            params: {
                rollUpType: timeSeries
            }
        });
        this.dataSource();
    }

    mapStateToProps(state) {
        let defaultProps = {name: "date_format", values: [{value: "count", color: "turquoise"}], yLabel: "# Drills"};

        state.submissions = state.submissions.slice(Math.max(state.submissions.length - 24, 0))

        let dates = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next[defaultProps.name])) {
                accum.push(next[defaultProps.name]);
            }
            return accum;
        }, []);

        return {
            ...state,
            ...defaultProps,
            xValues: dates,
            yMax: state.submissions.reduce((accum, next) => {
                return (next[defaultProps.values[0].value] > accum) ? next[defaultProps.values[0].value] : accum;
            }, 0)
        };
    }

    componentDidMount() {
        if (!this.props.dispatch) {
            this.initDataSource();
        } else {
            this.setState({isMounted: true});
        }
    }

    async handleInit(timeSeries) {
        await this.setState({
            params: {
                rollUpType: timeSeries
            }
        });

        if (this.state.isMounted) {
            this.props.socket.on('connect', this.dataSource);
            this.props.socket.on('authStateChange', this.dataSource);
            this.dataSource();
        } else {
            this.componentDidMount = this.initDataSource;
        }
    }
}

