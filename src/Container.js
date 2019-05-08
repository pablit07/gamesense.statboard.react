import React, {Component, Fragment} from 'react';


class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submissions: [],
            params: props.params
        };

        this.dataSource = this.dataSource.bind(this);
    }

    getRoutingKey() {
        throw new Error("Must override getRoutingKey");
    }

    mapStateToProps(state) {
        throw new Error("Must override mapStateToProps");
    }

    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        this.setState({isLoading: true});

        let payload = {filters: {}};

        if (this.props.filters) Object.assign(payload.filters, this.props.filters);
        if (this.state.params) Object.assign(payload, this.state.params);

        payload.authToken = this.props.socket.authToken;
        // payload.filters.minDate = this.state.startDate;
        // payload.filters.maxDate = this.state.endDate;

        // indiv or team
        // payload.filters.user_id = 150;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: this.getRoutingKey(),
            payload
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);

        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
            console.log('Here is the payload:\n', responseData);
            this.setState({submissions: responseData, isLoading: false});

        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    }

    componentDidMount() {
        this.initDataSource();
    }

    initDataSource() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

    render() {
        let newState = {...this.state};
        return (<Fragment>{React.Children.map(this.props.children, child => React.cloneElement(child, this.mapStateToProps(newState)))}</Fragment>);
    }
}

export default Container;