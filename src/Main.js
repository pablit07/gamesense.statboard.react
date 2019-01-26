import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import TestSubmissions from './TestSubmissions/TestSubmissions';
import DrillUsage from './DrillUsage/DrillUsage';
import { create } from 'socketcluster-client';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /testsubmissions
// and /drillusage routes will match any pathname that starts
// with /testsubmissions or /drillusage. The / route will only match
// when the pathname is exactly the string "/"

const Main = () => {

	var socket = null;
    try {
        const opts = {
          hostname: 'svc.gamesensesports.com',
          secure: false,
          rejectUnauthorized: false,
          path: '/',
          port: 8100
        };
        socket = create(opts);

        socket.on('connect', function () {
          console.log('Connected to worker via socket ID', socket.id);
        })

        socket.on('error', function (err) {
          throw Error('Socket error: ' + err);
        })
    } catch (err) {
      console.error(err);
    }

	return (
	  <main>
	    <Switch>
	      <Route exact path='/' component={Home}/>
	      <Route exact path='/testsubmissions' render={() => (<TestSubmissions socket={socket} />)} />
	      <Route path='/drillusage' render={() => (<DrillUsage socket={socket} />)} />
	    </Switch>
	  </main>
	);
}

export default Main