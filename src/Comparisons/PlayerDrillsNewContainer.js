import Container from "../Container";
import actions from "../actions";
export default class PlayerDrillsNewContainer extends Container {

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
      let defaultProps = {name: "date_format", values: [{value: "count", color: "#4D9360"}], yLabel: "Drills Completed"};
    
      // Sort state.submissions chronologically. Gets all submissions to a max of 12.   
      state.submissions = state.submissions.slice(Math.max(state.submissions.length - 12, 0))
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
          ...state,
          ...defaultProps,
          values: allData,
          handleSelect: v => this.setState({selectedTimePeriod: v})
      };
    }
}