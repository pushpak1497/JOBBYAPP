import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-data-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="text">
        Millions of people are searching for jobs,salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="home-Route-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
