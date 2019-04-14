import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import columns from './columns';
import {Table} from "../Table";


class DrillDetails extends Component {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);


        this.state = {
            submissions: [],
            columns: columns,
            isLoading: false,
            startDate: dateOneMonthAgo,
            endDate: now
        };

        this.dataSource = this.dataSource.bind(this);
    }


    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        this.setState({isLoading: true});

        let payload = {filters: {}, rollUpType: 'teamPitcherResponse'};

        payload.authToken = this.props.socket.authToken;
        payload.filters.minDate = this.state.startDate;
        payload.filters.maxDate = this.state.endDate;

        // indiv or team
        // payload.filters.user_id = 150;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.drill.usageDetail',
            payload
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
            console.log('Here is the payload:\n', responseData);

            let columns = this.state.columns;
            responseData.keys.forEach(pt => {
                columns.push({
                    Header: '% ' + pt,
                    accessor: "pitchType_" + pt,
                    style: {
                        textAlign: 'center'
                    },
                    filterable: false,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100
                });
            });

            this.setState({
                isLoading: false,
                columns: columns,
                submissions: responseData.rows
            });
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    }

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

    render() {
        return (<Table
                    submissions={this.state.submissions}
                    columns={columns}
                    isLoading={this.state.isLoading}
                    buttons={[]}
                    defaultPageSize={10}
                    updateSelection={selection => this.setState({selection})}/>);
    }
}

export default DrillDetails;