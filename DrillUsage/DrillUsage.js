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
      posts: []
    }
  }
  componentDidMount(){
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      this.setState({posts:posts})
    })
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

export default TestSubmissions;
