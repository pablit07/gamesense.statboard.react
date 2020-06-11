import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
const Home = () => (
  <div className="body">
      <ul>
        <li>
          <Link to='/testsubmissions'>Test Submissions</Link>
        </li>
        <li>
          <Link to='/drillusage'>Drill Usage</Link>
        </li>
        <li>
          <Link to='/coachreport'>Coach Report</Link>
        </li>
        <li>
          <Link to='/drilldetails'>Drill Breakdown (Tables)</Link>
        </li>
        <li>
          <Link to='/drilldetailscharts'>Drill Breakdown (Charts) - DrillDetailsChartView.js</Link>
        </li>
        <li>
          <Link to='/streaks'>Usage Streaks (Charts)</Link>
        </li>
        <li>
          <Link to='/scorecomparisoncharts'>Score Comparisons (Charts)</Link>
        </li>
        <li>
          <Link to='/teamcomparecharts'>Team Comparisons (Charts) - TeamTestView.js</Link>
        </li>
        <li>
          <Link to='/responsivechart'>Drill Usage - Hooks Responsive Chart</Link>
        </li>
        <li>
          <Link to='/monthlybugview'>monthlyBugView,js</Link>
        </li>
      </ul>
  </div>
)

export default Home