import Container from "../Container";
import actions from "../actions";
export default class PlayerDrillsNewContainer extends Container {

    constructor(props) {
      super(props);
      this.state.filters = this.state.filters || {};
      this.state.submissions = [];

      this.updateTimeSeries = this.updateTimeSeries.bind(this);
      this.updateTimeSeriesFromLocalStorage = this.updateTimeSeriesFromLocalStorage.bind(this);

      if (props.dispatch) {
          props.dispatch.on(actions.TIMESERIES_PICKLIST_UPDATE, this.updateTimeSeries);
          props.dispatch.on(actions.TIMESERIES_PICKLIST_INIT, this.updateTimeSeriesFromLocalStorage);
      }
    }

    async updateTimeSeries(timeSeries) {
      await this.setState({
          submissions: [],
          params: {
              rollUpType: timeSeries // this is weekly, monthly, yearly
          }
      });
      this.dataSource();
      console.log('########### update timeSeries ----> ' + timeSeries);
    }

    // almost the same but need to accomodate the component trying to mount
    async updateTimeSeriesFromLocalStorage(timeSeries) {
      await this.setState({
          params: {
              rollUpType: timeSeries
          },
          hasInitBeenCalled: true
      });
      console.log('########### init timeSeries ----> ' + timeSeries);
      if (this.state.isMounted) {
          this.initDataSource();
      }
    }

    getRoutingKey() {
      return 'calc.drill.completionSummary'; 
  }

    mapStateToProps(state) {
      let defaultProps = { values: [{value: "count", color: "#4D9360"}] };
      let dataPeriod;
    
      // Sort state.submissions chronologically. Gets all submissions to a max of 12.   
      state.submissions =  state.submissions ? [...state.submissions] : [];

      state.submissions
      .sort((l, r) => {
          // sort numerically
          if (l.year !== r.year) {
              return l.year - r.year; 
          } else {
              return l.month - r.month;
          }
      });

      let allData = state.submissions ? [...state.submissions] : [];
      let curWeek = []; 
      let curWeekNum; 

      if (allData.length) {
        // just need a year of data at most ...
        allData = allData ? allData.slice(allData.length - 52, allData.length) : [];

        // Determine weekly, monthly or yearly ...
        let latestEntry =  allData.slice(-1)[0];

        if (latestEntry.hasOwnProperty('week')) {
          dataPeriod = 'weekly';
        } else if (latestEntry.hasOwnProperty('month')){
          dataPeriod = 'monthly';
        } else {
          dataPeriod = 'yearly'
        }
        console.log("============== dataPeriod ---> dataPeriod");



    

        // get last entry in array 
        curWeek =  allData.slice(-1)[0]

        if (curWeek) {
          console.log("================== curWeek ==============");
          curWeekNum = curWeek.week;
          console.log(curWeekNum);
        }
      }
      
      // important - don't sort beyond this point! will mix up graph
      // This assigns (copies) the value of 'count' to variable 'count'. Why?
      allData = allData.map((r, i) => Object.assign(r, {count: r['count'], index: i}));
      
      let displayNames, uniqueNames;
      let lastWeekDrills = [];
      if (allData.length){
        // ToDo: Implement display_names 
        displayNames = allData.map(entry => entry.player_last_name +", "+ entry.player_first_name);
        // get only unique names (these are players over the last 52 weeks)...
        uniqueNames = Array.from(new Set(displayNames));


        // Now get all values for curWeek only ...
         allData.forEach(function(entry) {
             if (entry.week === 30) {
               lastWeekDrills.push(entry);
             }
         });
      }
      if (lastWeekDrills.length){
        // reassign count to count so it plots ... 
        lastWeekDrills = lastWeekDrills.map((r, i) => Object.assign(r, {count: r['count'], index: i}));
        
        console.log("============== lastWeekDrills");
        console.log(lastWeekDrills);
      }
     
      // // good way to get last week's players
      // if (allData.length){
      //   for (var {week: w, player_last_name: n} of allData) {
      //     if (w === 30){
      //       console.log('Name: ' + n + ', Week: ' + w);
      //     }  
      //   };
      // }    

      return {
          ...state,
          ...defaultProps,
          values: lastWeekDrills,
          handleSelect: v => this.setState({selectedTimePeriod: v})
      };
    }
}