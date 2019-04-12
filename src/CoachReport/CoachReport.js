import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import {downloadExcelSheet} from '../Utils'
import Calendar from '../Calendar'
import columns from './columns';
import {Table} from "../Table";


class CoachReport extends Component {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);

        this.state = {
            submissions: [],
            selection: [],
            endDate: now,
            startDate: dateOneMonthAgo,
            isLoading: false
        };

        this.dataSource.bind(this);
        this.exportSource.bind(this);
    }


    dataSource() {
      if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

      this.setState({isLoading:true});

      let payload = {filters:{}};

      payload.authToken = this.props.socket.authToken;

      payload.filters.minDate = this.state.startDate;
      payload.filters.maxDate = this.state.endDate;

      const timestamp = Date.now();
      const data = {
          timestamp: timestamp,
          routingKey: 'calc.drill.coachReport',
          payload
      };
      this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
      this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
          this.props.socket.unsubscribe('gs-message-' + timestamp);
          console.log('GameSense API responded:\n', response);
          const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
          console.log('Here is the payload:\n', responseData);
          this.setState({isLoading:false});
          this.setState({
              submissions: responseData,
              isLoading: false
          });
          this.props.socket.off('connect', this.dataSource);
      });
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
  }


  exportSource() {
    if (this.props.socket.state !== "open") return;
    let payload = this.payload;

      const timestamp = Date.now()
      const data = {
          timestamp: timestamp,
          routingKey: 'export.drill.coachReport',
          payload
      };
      this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
      this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
          this.props.socket.unsubscribe('gs-message-' + timestamp);
          console.log('GameSense API responded:\n', response);

          downloadExcelSheet(response);

          console.log('Here is the payload:\n', response);
      });
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
  }

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

    async handleDateChange({startDate, endDate}) {
        await this.setState({startDate, endDate});
        this.dataSource();
    }

    logSelection = () => {
        console.log("selection:", this.state.selection);
    };


    render() {

        const buttons = [
            (<button key={'Log Selection Button'} onClick={this.logSelection.bind(this)} className="btn btn-blue">Log Selection</button>),

            (<button key={'Excel Button'} onClick={this.exportSource} className="btn btn-green fa fa-table">Export to XLS</button>),

            (<Calendar key={'Calendar'} startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleDateChange.bind(this)}/>)
        ];

        return (<Table
                columns={columns}
                submissions={this.state.submissions}
                isLoading={this.state.isLoading}
                buttons={buttons}/>);
    }
}

export default CoachReport;