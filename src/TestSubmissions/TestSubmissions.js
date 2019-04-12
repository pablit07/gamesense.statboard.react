import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExportToExcel from './ExportToExcel';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import Calendar from "../Calendar";
import {downloadExcelSheet} from "../Utils";


const CheckboxTable = checkboxHOC(ReactTable);


class TestSubmissions extends Component {
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
            isLoading: false
        };

        this.dataSource = this.dataSource.bind(this);
    }

    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken) return;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.test.usageSummary',
            payload: {authToken: this.props.socket.authToken, filters: {minDate: this.state.startDate, maxDate: this.state.endDate}}
        };
        this.setState({isLoading:true});
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
                // CreateTableFromJSON(res)
            console.log('Here is the payload:\n', res);
            this.setState({isLoading:false});
            this.setState({
                submissions: res
            });
            this.props.socket.off('connect', this.dataSource);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
    }

    exportSource(submissionId) {
      if (this.props.socket.state !== "open") return;

        const timestamp = Date.now()
        const data = {
            timestamp: timestamp,
            routingKey: 'export.test.singlePlayer',
            payload: {"id_submission":submissionId}
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);

            downloadExcelSheet(response);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
    }

    async handleDateChange({startDate, endDate}) {
        await this.setState({startDate, endDate, submissions: []});
        this.dataSource();
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
      // console.log(this.state.selection.includes(key))
  }

    logSelection = () => {
      console.log("selection:", this.state.selection);
      // .forEach()
    };

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

  render() {

      const columns = [
          {
              Header: "Player ID",
              accessor: "player_id",
              style: {
                  textAlign: 'left'
              },
              width: 300,
              maxWidth: 100,
              minWidth: 100
          },
          {
              Header: "Team",
              accessor: "team",
              style: {
                  textAlign: 'left'
              },
              width: 200,
              maxWidth: 100,
              minWidth: 100
          },
          {
              Header: "#",
              accessor: "number_of_responses",
              sortable: true,
              filterable: true,
              style: {
                  textAlign: 'center'
              },
              width: 70,
          },
          {
              Header: "Upload",
              accessor: "source_etl",
              sortable: true,
              filterable: true,
              style: {
                  textAlign: 'left'
              },
              width: 100
          },
          {
              Header: "Device",
              accessor: "device",
              sortable: true,
              filterable: true,
              style: {
                  textAlign: 'right'
              },
          },
          {
              Header: "Test Date",
              accessor: "test_date",
              sortable: false,
              filterable: false,
              style: {
                  textAlign: 'right'
              },
              width: 200,
          },
          {
              Header: "Actions",
              Cell: props => {
                  return (
                      <button style={{backgroundColor: 'green', color: '#fefefe'}}
                              onClick={() => {
                                  this.exportSource(props.original.id_submission);
                              }}
                      >Download</button>
                  );
              },
              sortable: false,
              filterable: false,
              width: 80,
              maxWidth: 100,
              minWidth: 100
          },
      ]

      const {toggleSelection, toggleAll, logSelection} = this;
      const {selectAll} = this.state;
      const isSelected = this.isSelected.bind(this)

      const checkboxProps = {
          selectAll,
          isSelected,
          toggleSelection,
          toggleAll,
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
                      <h3>Test Submissions</h3>

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
                          this.reactTable = state.pageRows.map(post => {
                              return post
                          });
                          return (
                              <div id="actionButtons">

                                  <button onClick={logSelection} className="btn btn-blue">Log Selection</button>
                                  {/* <button className="logSelectionButton" onClick={logSelection}>Log Selection</button> */}

                                  <ExportToExcel posts={this.reactTable}/>

                                  <button className="btn">
                                      <Link
                                          to='/drillusage'>Drill Usage Reports </Link>
                                      <i className="fa fa-arrow-right"/>
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

export default TestSubmissions;