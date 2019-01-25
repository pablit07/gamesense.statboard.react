import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ExportToExcel from './ExportToExcel';

class DrillUsage extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: []
    }
  }
  componentDidMount(){
    this.dataSource();
  }

  dataSource() {

      const timestamp = Date.now()
      const data = {
        timestamp: timestamp,
        routingKey: 'calc.drill.usageSummary',
        payload: {}
      }
      this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data)
      this.props.socket.subscribe('gs-message-' + timestamp).watch( (response) => {
        this.props.socket.unsubscribe('gs-message-' + timestamp)
        console.log('GameSense API responded:\n', response)
        const res = typeof response.content === 'string' ? JSON.parse(response.content) : null
        // CreateTableFromJSON(res)
        console.log('Here is the payload:\n', res)
        // this.setState({submissions:res})
      })
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp)
  }

  // deleteRow(id){
  //  const index = this.state.posts.findIndex(post => {
  //    return post.id === id
  //  })
  //  this.state.posts.splice(index,1);
  //  this.setState({posts: this.state.posts});
  // }
  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
        style: {
          textAlign:'right'
        },
        width:100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign:'right'
        },
        width:100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Content",
        accessor: "body",
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
            data={this.state.posts}
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
