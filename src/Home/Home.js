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

      </ul>
  </div>
)

export default Home