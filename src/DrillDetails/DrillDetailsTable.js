import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import columns from './columns';
import {Table} from "../Components/Table";


class DrillDetailsTable extends Component {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);


        let _columns = this.props.columns ? [...this.props.columns] : [...columns];

        this.state = {
            submissions: [],
            columns: _columns,
            isLoading: false,
            startDate: dateOneMonthAgo,
            endDate: now
        };

        this.dataSource = this.dataSource.bind(this);
    }


    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        this.setState({isLoading: true});

        let payload = {filters: {}, rollUpType: this.props.rollUpType || 'teamPitcherResponseType'};

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

            let _columns = this.state.columns;

            responseData.keys.sort().forEach(pt => {
                _columns.push({
                    Header: '% ' + pt,
                    accessor: "pitchType_" + pt,
                    style: {
                        textAlign: 'center'
                    },
                    filterable: false,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100,
                    Cell: props => {
                        let perc = props.original['pitchType_' + pt];
                        let className = perc > 75 ? 'green' :
                            perc > 50 ? 'blue' :
                            perc > 25 ? 'orange' :
                            perc > 0  ? 'red' : '';
                        return (<div className={className}>{perc}</div> )
                    }
                });
            });

            this.setState({
                isLoading: false,
                columns: _columns,
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
                    columns={this.state.columns}
                    isLoading={this.state.isLoading}
                    buttons={[]}
                    defaultPageSize={(this.props.defaultPageSize || 25)}
                    updateSelection={selection => this.setState({selection})}
                    hideCheckboxes={this.props.hideCheckboxes}/>);
    }
}

export default DrillDetailsTable;