import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    title,
    id,
    rating,
    employmentType,
    companyLogoUrl,
    jobDescription,
    location,
    packagePerAnnum,
  } = details
  return (
    <Link to={`/jobs/${id}`}>
      {' '}
      <div className="job-card">
        <div className="logo-heading-container">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div className="title-rating-container">
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="location-type-salary-container">
          <div className="location-type-container">
            <div className="location-container">
              <p>{location}</p>
            </div>
            <div className="employment-type-container">
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}
export default JobCard
