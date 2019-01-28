import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExportToExcel from './ExportToExcel';


class TestSubmissions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submissions: []
        }
    }

    dataSource() {
        if (this.props.socket.state !== "open") return;

        const timestamp = Date.now()
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.test.usageSummary',
            payload: {}
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
                // CreateTableFromJSON(res)
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
            routingKey: 'export.test.singlePlayer',
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

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource.bind(this));
        this.dataSource();
    }

  render() {
    const columns = [
      {
        Header: "Team",
        accessor: "team",
        style: {
          textAlign:'left'
        },
        width:200,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Player ID",
        accessor: "player_id",
        style: {
          textAlign:'left'
        },
        width:300,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "#",
        accessor: "number_of_responses",
        sortable: false,
        filterable: false,
        width:70,
      },
      {
        Header: "Upload",
        accessor: "source_etl",
        sortable: false,
        filterable: false,
        style: {
          textAlign:'left'
        },
      },
      {
        Header: "Test Date",
        accessor: "test_date",
        sortable: false,
        filterable: false,
        style: {
          textAlign:'right'
        },
        width:200,
      },
      {
        Header: "Actions",
        Cell: props => {
          return (
            <button style={{backgroundColor:'green', color: '#fefefe'}}
              onClick={() => {
                this.exportSource(props.original.id_submission);
              }}
            >Download</button>
          );
        },
        sortable: false,
        filterable: false,
        width:80,
        maxWidth: 100,
        minWidth: 100
      },
      {
        accessor: "id_submission",
        style: {
          display: 'none'
        },
        headerStyle: {
          display: 'none'
        },
        width: 0,
        className: 'id_submission'
      }
    ]
    return (
     <div className="background">
      <h6 className="pageTitle">GameSense StatBoard</h6>
        <div className="reactTable">
        <div className="reportTitle">
            <h3>Test Submissions</h3>
            <button className="reportButton">
              <Link
                style={{color: 'white'}}
                to='/drillusage'>Drill Usage Reports</Link>
            </button>
          </div>

          <ReactTable
            className="-highlight"
            columns={columns}
            data={this.state.submissions}
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

export default TestSubmissions;
