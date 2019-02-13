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
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="fa fa-table"
                    table="table-to-xls"
                    filename={"gameSense Test Submissions " + today}
                    sheet="tablexls"
                    buttonText=" Export to XLS"/>
                <table border= {1} hidden="true" id="table-to-xls">

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
                              <tr key={post.id_submissions}>
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