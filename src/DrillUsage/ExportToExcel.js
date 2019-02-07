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
                    filename="gameSenseDrillUsageReport"
                    sheet="tablexls"
                    buttonText=" Export to XLS"/>
                <table hidden="true" id="table-to-xls">
                    <thread>
                        <tr>
                            <th>Team</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Drill</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thread>
                    <tbody>
                    {
                      this.props.posts.map(post => {
                          return(
                              <tr key={post.id_submission}>
                                <td>{post.team_name}</td>
                                <td>{post.player_first_name}</td>
                                <td>{post.player_last_name}</td>
                                <td>{post.drill}</td>
                                <td>{post.first_glance_total_score}</td>
                                <td>{post.completion_timestamp_formatted}</td>
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