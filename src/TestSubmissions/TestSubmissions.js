import React, { Component, Fragment } from 'react';
import '../App.css';
import 'react-table/react-table.css';
import Calendar from "../Buttons/Calendar";
import {downloadExcelSheet} from "../Utils";
import columns from './columns';
import {Table} from "../Components/Table";
import {LinkButton, SelectionActionButton} from "../Buttons";
import { Redirect } from 'react-router';



class TestSubmissions extends Component {
    constructor(props) {
        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);

        this.state = {
            submissions: [],
            selection: [],
            startDate: localStorage.getItem('Test Submission Calendar - startDate') ? new Date(Date.parse(localStorage.getItem('Test Submission Calendar - startDate'))) : dateOneMonthAgo,
            endDate: localStorage.getItem('Test Submission Calendar - endDate') ? new Date(Date.parse(localStorage.getItem('Test Submission Calendar - endDate'))) : now,
            isLoading: false
        };

        this.dataSource = this.dataSource.bind(this);
        this.exportSource = this.exportSource.bind(this);
        this.recalculate = this.recalculate.bind(this);
        this.openDetail = this.openDetail.bind(this);

        columns.find(h => h.Header === 'Actions').Cell = props => {
            return (
                <Fragment>
                <span className={('indicator'+( props.original.number_of_responses === 0 || props.original.total_completely_correct_scores === props.original.number_of_responses ? ' good' : (props.original.completely_correct_scores === props.original.number_of_responses ? ' bad' : ' warning') ))}>&nbsp;</span>
                <button style={{backgroundColor: 'green', color: '#fefefe'}}
                        onClick={() => {
                            this.openDetail(props.original.id_submission);
                        }}
                >View</button>
                <button style={{backgroundColor: 'green', color: '#fefefe'}}
                        onClick={() => {
                            this.exportSource(props.original.id_submission);
                        }}
                >Download</button>
                <button style={{backgroundColor: 'green', color: '#fefefe'}}
                    onClick={() => {
                        this.recalculate(props.original.id_submission);
                    }}
                >Recalc</button>
                </Fragment>
            );
        };
    }

    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.test.usageSummary',
            payload: {authToken: this.props.socket.authToken, filters: {minDate: this.state.startDate, maxDate: this.state.endDate}}
        };
        this.setState({isLoading:true});
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
                // CreateTableFromJSON(res)
            console.log('Here is the payload:\n', res);
            this.setState({
                submissions: res,
                isLoading:false
            });
            this.props.socket.off('connect', this.dataSource);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    }

    exportSource(submissionId) {
      if (this.props.socket.state !== "open") return;

        const timestamp = Date.now()
        const data = {
            timestamp: timestamp,
            routingKey: 'export.test.singlePlayer',
            payload: {"id_submission":submissionId, force:true},
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);

            downloadExcelSheet(response);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
    }

    recalculate(submissionId) {
        if (this.props.socket.state !== "open") return;

        const timestamp = Date.now()
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.test.recalculate',
            payload: {"id_submission":submissionId}
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);

        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    }

    openDetail(openDetailId) {
        this.setState({openDetailId});
    }

    async handleDateChange({startDate, endDate}) {
        await this.setState({startDate, endDate, submissions: []});
        this.dataSource();
    }


    logSelection = () => {
        if (this.props.socket.state !== "open") return;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'export.test.calcSummary',
            payload: {authToken: this.props.socket.authToken, filters: {id_submissions: this.state.selection}}
        };
        this.setState({isLoading:true});
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);

            downloadExcelSheet(response);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    };

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

    render() {

        if (this.state.openDetailId) {
            return (<Redirect push to={"/TestSubmissions/" + this.state.openDetailId} />);
        }

        const buttons = [
          (<SelectionActionButton key={'Log Selection Button'} logSelection={this.logSelection.bind(this)} name={"Save PR Scores"}/>),

          (<LinkButton key={'Link Button'} inner={'Drill Usage'} href={'/drillusage'}/>),

          (<Calendar key={'Test Submission Calendar'} uniqueKey={'Test Submission Calendar'} startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleDateChange.bind(this)}/>)
        ];

        return (<Table
            key={'Test Submissions Table'}
            uniqueKey={'Test Submissions Table'}
            columns={columns}
            submissions={this.state.submissions}
            isLoading={this.state.isLoading}
            buttons={buttons}
            updateSelection={selection => this.setState({selection})}/>);
    }
}

export default TestSubmissions;