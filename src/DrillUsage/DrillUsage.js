import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import toggleHeader from "./ToggleHeader";
import {downloadExcelSheet} from '../Utils'
import Calendar from "../CoachReport/Calendar";


const CheckboxTable = toggleHeader(checkboxHOC(ReactTable));

class DrillUsage extends Component {
  constructor(props) {
    super(props);

    const now = new Date();
    const dateOneMonthAgo = new Date();
    dateOneMonthAgo.setDate(now.getDate() - 31);

    this.state = {
      submissions: [],
      selection: [],
      startDate: dateOneMonthAgo,
      endDate: now,
    };

    this.payload = {filters: {minDate: dateOneMonthAgo}}
    console.log("Showing Drill Usage data since", dateOneMonthAgo)
  }


  dataSource() {
    if (this.props.socket.state !== "open" || !this.props.socket.authToken) return;
    let payload = {filters:{}};

    if (!this.state.submissions.length) {
      payload.paginate = true;
    }

    payload.authToken = this.props.socket.authToken;

    payload.filters.minDate = this.state.startDate;
    payload.filters.maxDate = this.state.endDate;

    const timestamp = Date.now()
    const data = {
      timestamp: timestamp,
      routingKey: 'calc.drill.usageSummary',
      payload
    };
    this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
    this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
      this.props.socket.unsubscribe('gs-message-' + timestamp);
      console.log('GameSense API responded:\n', response);
      const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
      console.log('Here is the payload:\n', responseData);
      this.setState({
        submissions: responseData
      });
      if (payload.paginate) {
        payload.paginate = false;
        this.dataSource();
      }
    });
    console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
  }


  exportSource() {
    if (this.props.socket.state !== "open") return;
    let payload = this.payload;

      const timestamp = Date.now();
      const data = {
          timestamp: timestamp,
          routingKey: 'export.drill.usageSummary',
          payload
      };
      this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
      this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
          this.props.socket.unsubscribe('gs-message-' + timestamp);
          console.log('GameSense API responded:\n', response);

          downloadExcelSheet(response);

          console.log('Here is the payload:\n', response);
      });
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
      alert("Download will finish shortly")
  }

    toggleSelection = (key, shift, row) => {
      /*
        Implementation of how to manage the selection state is up to the developer.
        This implementation uses an array stored in the component state.
        Other implementations could use object keys, a Javascript Set, or Redux... etc.
      */
      // start off with the existing state
      let selection = [...this.state.selection];
      const keyIndex = selection.indexOf(key);
      // check to see if the key exists
      if (keyIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [
          ...selection.slice(0, keyIndex),
          ...selection.slice(keyIndex + 1)
        ];
      } else {
        // it does not exist so add it
        selection.push(key);
      }
      // update the state
      this.setState({ selection });
    };

    toggleAll = () => {
      /*
        'toggleAll' is a tricky concept with any filterable table
        do you just select ALL the records that are in your data?
        OR
        do you only select ALL the records that are in the current filtered data?

        The latter makes more sense because 'selection' is a visual thing for the user.
        This is especially true if you are going to implement a set of external functions
        that act on the selected information (you would not want to DELETE the wrong thing!).

        So, to that end, access to the internals of ReactTable are required to get what is
        currently visible in the table (either on the current page or any other page).

        The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
        ReactTable and then get the internal state and the 'sortedData'.
        That can then be iterrated to get all the currently visible records and set
        the selection state.
      */
      const selectAll = this.state.selectAll ? false : true;
      const selection = [];
      if (selectAll) {
        // we need to get at the internals of ReactTable
        const wrappedInstance = this.checkboxTable.getWrappedInstance();
        // the 'sortedData' property contains the currently accessible records based on the filter and sort
        const currentRecords = wrappedInstance.getResolvedState().sortedData;
        // we just push all the IDs onto the selection array
        currentRecords.forEach(item => {
          selection.push(item.id_submission);
        });
      }
      this.setState({ selectAll, selection });
    };

    isSelected(key) {
      return this.state.selection.includes(key);
    }

    logSelection = () => {
      console.log("selection:", this.state.selection);
    };

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource.bind(this));
        this.props.socket.on('authStateChange', this.dataSource.bind(this));
        this.dataSource();
    }

  async handleDateChange({startDate, endDate}) {
    await this.setState({startDate, endDate});
    this.dataSource();
  }


  render() {
    const columns = [
      {
        Header: "Team",
        accessor: "team_name",
        style: {
          textAlign: 'left'
        },
        width: 200,
        maxWidth: 100,
        minWidth: 100,
        toggle: [{label: 'Individ', value: ""}, {label: "Teams", value: "*"}]
      },
      {
        Header: "First Name",
        accessor: "player_first_name",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Last Name",
        accessor: "player_last_name",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Drill",
        accessor: "drill",
        style: {
          textAlign: 'left'
        },
        width: 300,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Score",
        accessor: "first_glance_total_score",
        style: {
          textAlign: 'center'
        },
        width: 70,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "App",
        accessor: "app",
        style: {
          textAlign: 'center'
        },
        width: 50,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Device",
        accessor: "device",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Date",
        accessor: "completion_timestamp_formatted",
        style: {
          textAlign: 'right'
        },
        width: 225,
        maxWidth: 100,
        minWidth: 100
      },
    ];

    const {toggleSelection, toggleAll, logSelection} = this;
    const {selectAll} = this.state;
    const isSelected = this.isSelected.bind(this)
    const exportSource = this.exportSource.bind(this)

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      exportSource,
      selectType: "checkbox",
      // getTdProps: (r, s) => {
      //   const selected = this.isSelected(r.id_submission);
      //   return {
      //     style: {
      //       backgroundColor: selected ? "lightgreen" : "inherit"
      //       // color: selected ? 'white' : 'inherit',
      //     }
      //   };
      // }
    };

    return (
        <div className="background">
          <h6 className="pageTitle">GameSense StatBoard</h6>
          <div className="reactTable">
            <div className="reportTitle">
              <h3>Drill Usage Report</h3>

            </div>
            <CheckboxTable
                keyField='id_submission'
                ref={r => (this.checkboxTable = r)}
                className="-striped -highlight"
                columns={columns}
                data={this.state.submissions}
                filterable
                defaultPageSize={25}
                noDataText={"...Please Wait"}
                {...checkboxProps}
            >


              {(state, filteredData, instance) => {
                return (
                    <div id="actionButtons">

                      <button onClick={logSelection} className="btn btn-blue">Log Selection</button>
                      <button onClick={exportSource} className="btn btn-green fa fa-table">Export to XLS</button>

                      {/* Log Selection Button */}
                      {/* <button className="logSelectionButton" onClick={logSelection}>Log Selection</button> */}

                      {/* Excel Button */}
                      {/* <button onClick={exportSource} id="test-table-xls-button" className="fa fa-table" type="button"> Export to XLS</button> */}

                      {/* Link Button */}
                      <button className="btn">
                        <Link
                            to='/testsubmissions'>Test Submissions </Link>
                        <i className="fa fa-arrow-right" aria-hidden="true"/>
                      </button>

                      <Calendar startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleDateChange.bind(this)}/>

                      {/* React-Table */}
                      {filteredData()}

                    </div>
                );
              }}

            </CheckboxTable>
          </div>
        </div>
    );
  }
}

export default DrillUsage;