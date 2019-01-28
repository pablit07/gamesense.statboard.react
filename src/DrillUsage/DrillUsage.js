import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExportToExcel from './ExportToExcel';

class DrillUsage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usage: []
        }
    }
    componentDidMount() {
        this.props.socket.on('connect', this.dataSource.bind(this));
        this.dataSource();
    }

    dataSource() {
        if (this.props.socket.state !== "open") return;

        const timestamp = Date.now()
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.drill.usageSummary',
            payload: {}
        }

        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            this.isSubscribed = false;
            console.log('GameSense API responded:\n', response);
            const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
                // CreateTableFromJSON(res)
            console.log('Here is the payload:\n', res);
            this.setState({
                usage: res
            });
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
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
      //       <button style={{backgroundColor:'red', color: '#fefefe'}}
      //         onClick={() => {
      //           this.deleteRow(props.original.id)
      //         }}
      //       >Delete</button>
      //     );
      //   },
      //   sortable: false,
      //   filterable: false,
      //   width:100,
      //   maxWidth: 100,
      //   minWidth: 100
      // }
    ];
    return (
     <div className="background">
      <h6 className="pageTitle">GameSense StatBoard</h6>
        <div className="reactTable">
          <div className="reportTitle">
            <h3>Drill Usage Report</h3>
            <button className="reportButton">
              <Link
                style={{color: 'white'}}
                to='/testsubmissions'>Test Submissions</Link>
            </button>
          </div>

          <ReactTable
            className="-highlight"
            columns={columns}
            data={this.state.usage}
            filterable
            defaultPageSize={10}
            noDataText={"...Please Wait"}
            >

            {(state, filteredData, instance) => {
              this.reactTable = state.pageRows.map(post => {return post._original});
              return(
                <div>
                  {filteredData()}
                  <ExportToExcel posts={this.reactTable} />
                </div>
              );
            }}

            </ReactTable>
        </div>
      </div>
    );
  }
}

export default DrillUsage;
