import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home/Home'
import TestSubmissions from './TestSubmissions/TestSubmissions'
import DrillUsage from './DrillUsage/DrillUsage'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /testsubmissions
// and /drillusage routes will match any pathname that starts
// with /testsubmissions or /drillusage. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/testsubmissions' component={TestSubmissions}/>
      <Route path='/drillusage' component={DrillUsage}/>
    </Switch>
  </main>
)

export default Main