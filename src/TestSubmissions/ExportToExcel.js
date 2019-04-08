import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';


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
                    className="btn btn-green fa fa-table"
                    table="table-to-xls"
                    filename={"gameSense Test Submissions " + today}
                    sheet="tablexls"
                    buttonText=" Export to XLS"/>
                <table hidden={true} id="table-to-xls">

                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Team</th>
                            <th># </th>
                            <th>Upload</th>
                            <th>Test Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.posts.map((post, i) => {
                          return(
                              <tr key={i}>
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