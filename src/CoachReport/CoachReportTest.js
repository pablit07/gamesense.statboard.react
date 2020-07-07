import React, { Component } from 'react';
import { create } from 'socketcluster-client';

const dateOneMonthAgo = new Date();
dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() - 31);

var logs = {};
function logStart(name) {
    logs[name] = new Date();
}

function logStop(name) {
    if (!logs[name]) return;
    let time = Date.now() - logs[name];
    let logResult = "[Timer]: " + name + ` took ${time} ms to complete.`;
    console.log(logResult);
    return logResult;
}



// copied code

function getNewSocket(username, token) {
    
    var socket = null;
    try {
        const opts = {
          hostname: 'svc.gamesensesports.com',
          secure: true,
          rejectUnauthorized: false,
          path: '/',
          port: 8101
        };
        const credentials = {
          username: username,
          token:  token,
          app: 'BB'
        };
        socket = create(opts);

        socket.on('connect', function (status) {
          console.log('Connected to worker via socket ID', socket.id);
          console.log('Auth Status: ', status.isAuthenticated);
          if (!status.isAuthenticated) {
            socket.emit('login', credentials, function (err) {
              if (err) {
                console.warn('User auth error')
              }
              else {
                  console.log('User is authenticated')
              }

            });
          }
        })

        socket.on('close', function () {
          console.log('Socket is closing...');
        })

        socket.on('error', function (err) {
            try {
                throw Error('Socket error: ' + err);
            } catch (e) {
                console.error(e);
            }
        })
    } catch (err) {
      console.error(err);
    }

    return socket;
}


class CoachReportTest extends Component {
    constructor(props) {
        super(props);
        console.log("start");
        this.state = {
            logMessages: []
        };
    }


    dataSource(username, socket) {
      logStart("REQUEST FOR " + username);

      if (socket.state !== "open" || !socket.authToken) return;
      let payload = {filters:{minDate:dateOneMonthAgo}};

      payload.authToken = socket.authToken;

      const timestamp = Date.now()
      const data = {
          timestamp: timestamp,
          routingKey: 'export.drill.coachReport',
          payload
      };
      socket.publish('SC_MESSAGE-' + socket.id, data);
      socket.subscribe('gs-message-' + timestamp).watch((response) => {
          socket.unsubscribe('gs-message-' + timestamp);
          console.log('GameSense API responded:\n', response);
          const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
          console.log('Here is the payload:\n', responseData);

          let logMessages = this.state.logMessages;
          logMessages.push(logStop("REQUEST FOR " + username));
          this.setState({logMessages});
      });
      console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
  }

    componentDidMount() {

        let users = [
            {username: 'peterfadde', token: '91eafccde30a265c85c2d21010411c5402ae17f8'},
            {username: 'coachfadde', token: 'b561b85c0c9905aaf5cbe85b3313e0c766dd72b2'},
            {username: 'reg6', token: 'fd399540e8be81e19f9b3bf33fc0dbe63b5cdbeb'},
            {username: 'reg5', token: '33a3e59737460f71df9dcdecb799cf03183f3386'},
            {username: 'reg4', token: '0bfbb95aac15266aaddfa613c019be4fb0214523'},
            {username: 'reg3', token: 'dda2d82dccb8ab2d431da0d22ea56d9a6bb61674'},
            {username: 'reg2', token: '8eb05c1e6d8db4969463bb5185d95019a540d0f6'},
            {username: 'reg1', token: 'eb90794055eb7e2acdf2aa4908a932896ac02686'},
        ];

        let self = this;

        (u => {
            let username = u.username, token = u.token;
            let socket = getNewSocket(username, token);
            let callback = () => {
                self.dataSource(username, socket);
            };

            socket.on('connect', callback);
            socket.on('authStateChange', callback);
        })(users[Math.floor(Math.random() * 8)]);
    }

    componentWillUpdate(){
    }



  render() {

      const logMessages = this.state.logMessages.map(m => {
          return (<li>{m}</li>);
      });

      return (
     <div className="background">
         <ul>
            { logMessages }
         </ul>
      </div>
    );
  }
}

export default CoachReportTest;