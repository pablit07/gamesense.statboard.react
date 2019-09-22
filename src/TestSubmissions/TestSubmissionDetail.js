import React, { Component, Fragment } from 'react';
import '../App.css';



class TestSubmissionDetail extends Component {
    constructor(props) {
        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);

        this.state = {
            totalScore: "",
            typeScore: "",
            locationScore: "",
            activityId: null,
            isLoading: false
        };

        this.dataSource = this.dataSource.bind(this);
    }

    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.test.calcSummary',
            payload: {authToken: this.props.socket.authToken, filters: {id_submission: this.props.match.params.id_submission}}
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
                totalScore: res[0].first_glance_total_score,
                locationScore: res[0].first_glance_location_score,
                typeScore: res[0].first_glance_type_score,
                activityId: res[0].activity_id,
                isLoading:false
            });
            this.props.socket.off('connect', this.dataSource);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    }

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

  render() {


      return (<div className="data-view">
          <dl>
              <dt>Total gS Score™ - <span className="info">correct response pitch type and location</span></dt>
              <dd>{this.state.totalScore}</dd>
              <dt>Pitch Type gS Score™ - <span className="info">correct response pitch type</span></dt>
              <dd>{this.state.typeScore}</dd>
              <dt>Pitch Location gS Score™ - <span className="info">correct response ball or strike</span></dt>
              <dd>{this.state.locationScore}</dd>
          </dl>
          <dl>
              <dt>&nbsp;</dt>
              <dd></dd>
          </dl>
          <dl>
              <dt>Activity ID</dt>
              <dd><a href={(this.state.activityId ? "https://app.gamesensesports.com/admin/account/testactivity/" + this.state.activityId + "/change/?_changelist_filters=p%3D1" : '')}>{this.state.activityId}</a></dd>
          </dl>
      </div>);
  }
}

export default TestSubmissionDetail;