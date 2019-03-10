import { create } from 'socketcluster-client';

var socket = null;
    try {
        const opts = {
          hostname: 'svc.gamesensesports.com',
          secure: false,
          rejectUnauthorized: false,
          path: '/',
          port: 8100
        };
        const credentials = {
          username: 'coachkohlhoff',
          token: '91eafccde30a265c85c2d21010411c5402ae17f8',
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
          throw Error('Socket error: ' + err);
        })
    } catch (err) {
      console.error(err);
    }


export { socket };