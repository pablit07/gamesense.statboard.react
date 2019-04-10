import { create } from 'socketcluster-client';

var socket = null;
    try {
        const opts = {
          hostname: 'svc.gamesensesports.com',//'54.221.109.246',
          secure: true,
          rejectUnauthorized: false,
          path: '/',
          port: 8101
        };
        const credentials = {
          username: window.document.location.search.replace('?token=', '').split(':')[0],
          token:  window.document.location.search.replace('?token=', '').split(':')[1],
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


export { socket };