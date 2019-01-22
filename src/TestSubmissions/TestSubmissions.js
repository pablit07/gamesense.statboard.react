import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExportToExcel from './ExportToExcel';


class TestSubmissions extends Component {
  constructor(props){
    super(props)
    this.state = {
      submissions: []
    }
  }
  componentDidMount(){

    var socket = null
    try {
        const opts = {
          hostname: 'svc.gamesensesports.com',
          secure: false,
          rejectUnauthorized: false,
          path: '/',
          port: 8100
        }

        socket = window.socketCluster.connect(opts)

        socket.on('connect', function () {
          console.log('Connected to worker via socket ID', socket.id)
          sendMessage()
        })

        socket.on('error', function (err) {
          throw err('Socket error: ' + err)
        })
    } catch (err) {
      console.warn(err)
    }

    var sendMessage = () => {

      const timestamp = Date.now()
      const data = {
        timestamp: timestamp,
        routingKey: 'calc.test.usageSummary',
        payload: {}
      }
      socket.publish('SC_MESSAGE-' + socket.id, data)
      socket.subscribe('gs-message-' + timestamp).watch( (response) => {
        socket.unsubscribe('gs-message-' + timestamp)
        console.log('GameSense API responded:\n', response)
        const res = typeof response.content === 'string' ? JSON.parse(response.content) : null
        // CreateTableFromJSON(res)
        console.log('Here is the payload:\n', res)
        this.setState({submissions:res})
      })
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp)
    }
  }

  render() {
    const columns = [
      {
        Header: "Team",
        accessor: "team",
        style: {
          textAlign:'right'
        },
        width:100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Player ID",
        accessor: "player_id",
        style: {
          textAlign:'right'
        },
        width:100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Response Count",
        accessor: "number_of_responses",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Upload",
        accessor: "source_etl",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Test Date",
        accessor: "test_date",
        sortable: false,
        filterable: false,
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
