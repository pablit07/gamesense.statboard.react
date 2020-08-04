import Container from "../Container";
import actions from "../actions";



    // <TeamDrillsOverTimeContainer socket={this.props.socket} params={{rollUpType:"yearly"}} filters={null}>
    //               <TeamDrillsOverTimeChart/>
export default class TeamDrillsOverTimeContainer extends Container {
    constructor(props) {
        super(props);
        this.state.submissions = [];
        this.state.selectedTimePeriod = 'weekly';

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
        const timePeriod = state.selectedTimePeriod;
        console.log("+++++++++++++++++++  timePeriod +++++++++++++++++");
        console.log(timePeriod);

        // let fullName = player_
        let defaultProps = {name: "player_last_name", values: [{value: "count", color: "#4D9360"}], yLabel: "Drills Completed"};

        //console.log (state.submissions.length());
        // Sort state.submissions alphabetically. Gets all submissions to a max of 24.
        
        state.submissions.sort((a,b) => (a.player_last_name > b.player_last_name) ? 1 : -1)
        
        // Sort state.submissions chronologically. Gets all submissions to a max of 24.
        state.submissions = state.submissions.slice(Math.max(state.submissions.length - 24, 0))
            .sort((l, r) => {
                // sort numerically
                if (l.year !== r.year) {
                    return l.year - r.year; 
                } else {
                    return l.month - r.month;
                }
            });
            
            // Builds an array of just the 'player_last_name' items from state.submissions, in chronological order.
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
            }, 0),
            timePeriod,
            handleSelect: v => this.setState({selectedTimePeriod: v})
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

