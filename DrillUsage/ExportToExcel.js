import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ExportToExcel extends Component {

    render() {

        return (
            <div style={{marginRight: '25px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export"
                    table="table-to-xls"
                    filename="filteredData"
                    sheet="tablexls"
                    buttonText="Export"/>
                <table hidden="true" id="table-to-xls">
                    <thread>
                        <tr>
                            <th>User ID</th>
                            <th>ID</th>
                            <th>Title </th>
                            <th>Content</th>
                        </tr>
                    </thread>
                    <tbody>
                    {
                      this.props.posts.map(post => {
                          return(
                              <tr key={post.id}>
                                <td>{post.userId}</td>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                              </tr>
                          )
                      })
                    }
                </tbody>
                </table>
            </div>
        );
    }
}

export default ExportToExcel