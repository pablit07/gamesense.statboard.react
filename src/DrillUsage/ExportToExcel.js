import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import 'font-awesome/css/font-awesome.min.css';

class ExportToExcel extends Component {

    render() {

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;





        return (
            <div style={{marginRight: '25px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="fa fa-table"
                    table="table-to-xls"
                    filename={"gameSenseDrillUsageReport " + today }
                    sheet="tablexls"
                    shortDate
                    buttonText=" Export to XLS"/>
                <table hidden="true"  id="table-to-xls">
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

