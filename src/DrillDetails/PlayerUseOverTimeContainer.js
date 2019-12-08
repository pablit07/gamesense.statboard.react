import Container from "../Container";
import actions from "../actions";

export default class PlayerUseOverTimeContainer extends Container {
    constructor(props) {
        super(props);
        this.updateTimeSeries = this.updateTimeSeries.bind(this);
        this.updateTimeSeriesFromLocalStorage = this.updateTimeSeriesFromLocalStorage.bind(this);
        if (props.dispatch) {
            props.dispatch.on(actions.TIMESERIES_PICKLIST_UPDATE, this.updateTimeSeries);
            props.dispatch.on(actions.TIMESERIES_PICKLIST_INIT, this.updateTimeSeriesFromLocalStorage);
        }
    }

    getRoutingKey() {
        return 'calc.drill.completionSummary';
    }

    async updateTimeSeries(timeSeries) {
        await this.setState({
            submissions: [],
            params: {
                rollUpType: timeSeries
            }
        });
        this.dataSource();
    }

    // almost the same but need to accomodate the component trying to mount
    async updateTimeSeriesFromLocalStorage(timeSeries) {
        await this.setState({
            params: {
                rollUpType: timeSeries
            },
            hasInitBeenCalled: true
        });

        if (this.state.isMounted) {
            this.initDataSource();
        }
    }

    mapStateToProps(state) {
        let defaultProps = {name: "date_format", values: [{value: "count", color: "#4D9360"}], yLabel: "# Drills"};

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

    // override - need to make sure initDataSource is only called after both the picklist and this component are finished mounting
    componentDidMount() {
        if (!this.props.dispatch || this.state.hasInitBeenCalled) {
            this.initDataSource();
        } else {
            this.setState({isMounted: true});
        }
    }
}

