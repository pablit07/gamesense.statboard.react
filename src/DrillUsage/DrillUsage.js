import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExportToExcel from './ExportToExcel';
import checkboxHOC from "react-table/lib/hoc/selectTable";


const CheckboxTable = checkboxHOC(ReactTable);

class DrillUsage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submissions: [],
            selection: [],
        }
    }

    dataSource() {
      if (this.props.socket.state !== "open") return;

      const timestamp = Date.now()
      const data = {
          timestamp: timestamp,
          routingKey: 'calc.drill.usageSummary',
          payload: {filters:{minDate:"1-1-2019"}}
      }

      this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
      this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
          this.props.socket.unsubscribe('gs-message-' + timestamp);
          // this.isSubscribed = false;
          console.log('GameSense API responded:\n', response);
          const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
          let downloadFrame = document.getElementById("downloadFrame");
            if (!downloadFrame) {
                downloadFrame = document.createElement('iframe');
                downloadFrame.id = "downloadFrame";
                downloadFrame.style = "display: none;";
                document.getElementsByTagName('body')[0].appendChild(downloadFrame);
            }
            downloadFrame.src = res.s3_presigned1wk;

          console.log('Here is the payload:\n', res);
          this.setState({
              submissions: res
          });
      });
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
  }

  exportSource(submissionId) {
    if (this.props.socket.state !== "open") return;

      const timestamp = Date.now()
      const data = {
          timestamp: timestamp,
          routingKey: 'calc.drill.usageSummary',
          payload: {"id_submission":submissionId}
      };
      this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
      this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
          this.props.socket.unsubscribe('gs-message-' + timestamp);
          console.log('GameSense API responded:\n', response);
          const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
          let downloadFrame = document.getElementById("downloadFrame");
          if (!downloadFrame) {
              downloadFrame = document.createElement('iframe');
              downloadFrame.id = "downloadFrame";
              downloadFrame.style = "display: none;";
              document.getElementsByTagName('body')[0].appendChild(downloadFrame);
          }
          downloadFrame.src = res.s3_presigned1wk;

          console.log('Here is the payload:\n', res);
      });
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
  }

    toggleSelection = (key) => {
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
        this.props.socket.on('connect', this.dataSource.bind(this));
        this.dataSource();
    }



  render() {
    const columns = [
      {
        Header: "Team",
        accessor: "team_name",
        style: {
          textAlign:'left'
        },
        width:200,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "First Name",
        accessor: "player_first_name",
        style: {
          textAlign:'left'
        },
        width:200,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Last Name",
        accessor: "player_last_name",
        style: {
          textAlign:'left'
        },
        width:200,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Drill",
        accessor: "drill",
        style: {
          textAlign:'left'
        },
        width:300,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Score",
        accessor: "first_glance_total_score",
        style: {
          textAlign:'right'
        },
        width:70,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Date",
        accessor: "completion_timestamp_formatted",
        style: {
          textAlign:'right'
        },
        width:300,
        maxWidth: 100,
        minWidth: 100
      },
      // {
      //   Header: "Actions",
      //   Cell: props => {
      //     return (
      //       <button style={{backgroundColor:'green', color: '#fefefe'}}
      //         onClick={() => {
      //           this.exportSource(props.original.id_submission);
      //         }}
      //       >Download</button>
      //     );
      //   },
      //   sortable: false,
      //   filterable: false,
      //   width:80,
      //   maxWidth: 100,
      //   minWidth: 100
      // },
    ];

    const { toggleSelection, toggleAll, logSelection } = this;
    const { selectAll } = this.state;
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
            <h3>Drill Usage Report</h3>
            <button className="reportButton">
              <Link
                style={{color: 'white'}}
                to='/testsubmissions'>Test Submissions </Link>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
          <button className="logSelectionButton" onClick={logSelection}>Log Selection</button>
          <CheckboxTable
            keyField='id_submission'
            ref={r => (this.checkboxTable = r)}
            className="-striped -highlight"
            columns={columns}
            data={this.state.submissions}
            filterable
            defaultPageSize={10}
            noDataText={"...Please Wait"}
            {...checkboxProps}
            >

            {(state, filteredData, instance) => {
              this.reactTable = state.pageRows.map(post => {return post});
              return(
                <div>
                  {filteredData()}
                  <ExportToExcel posts={this.reactTable} />
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
