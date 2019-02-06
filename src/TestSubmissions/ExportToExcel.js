import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import 'font-awesome/css/font-awesome.min.css';


class ExportToExcel extends Component {


    render() {

        return (
            <div style={{marginRight: '25px'}}>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="fa fa-table"
                    table="table-to-xls"
                    filename="gameSense Test Submissions"
                    sheet="tablexls"
                    buttonText=" Export to XLS"/>
                <table id="table-to-xls">
                {/* hidden="true" */}
                    <thread>
                        <tr>
                            <th>Player ID</th>
                            <th>Team</th>
                            <th># </th>
                            <th>Upload</th>
                            <th>Test Date</th>
                        </tr>
                    </thread>
                    <tbody>
                    {
                      this.props.posts.map(post => {
                          return(
                              <tr key={post.player_id}>
                                <td>{post.player_id}</td>
                                <td>{post.team}</td>
                                <td>{post.number_of_responses}</td>
                                <td>{post.source_etl}</td>
                                <td>{post.test_date}</td>
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