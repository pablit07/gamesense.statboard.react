import {create as createSocketClusterClient} from 'socketcluster-client';

function create(username, app, key) {
    let socket = null;
    try {
        const opts = {
            hostname: 'svc.gamesensesports.com',
            secure: true,
            rejectUnauthorized: false,
            path: '/',
            port: 8101
        };
        let token = key ? false : window.document.location.search.replace('?token=', '');

        const credentials = (!key) ? {
            username: token.split(':')[0],
            token: token.split(':')[1],
            app: token.split(':')[2] || 'BB'
        } : {
           username,
           token: key,
           app
        };

        if (credentials && credentials.username) window.localStorage.removeItem('socketCluster.authToken');

        socket = createSocketClusterClient(opts);

        socket.on('connect', function (status) {
            console.log('Connected to worker via socket ID', socket.id);
            console.log('Auth Status: ', status.isAuthenticated);
            if (!status.isAuthenticated) {
                socket.emit('login', credentials, function (err) {
                    if (err) {
                        console.warn('User auth error');
                    } else {
                        console.log('User is authenticated');
                        let newUrl = window.location.origin + window.location.pathname;
                        window.history.replaceState({path: newUrl}, '', newUrl);
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

export {create};