import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import FilterJobs from '../FilterJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    activeEmploymentType: '',
    activePackage: '',
    searchInput: '',
    name: '',
    imageUrl: '',
    bio: '',
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const userData = await response.json()
      const updatedData = {
        profileDetails: userData.profile_details,
      }
      const {profileDetails} = updatedData
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      const {name, profileImageUrl, shortBio} = updatedProfileDetails
      this.setState({
        name,
        imageUrl: profileImageUrl,
        bio: shortBio,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentType, activePackage, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activePackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data

      const updatedData = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeInput = event => {
    if (event.key === 'Enter') {
      this.getData()
    } else {
      this.setState({
        searchInput: event.target.value,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  changeType = activeEmploymentType => {
    this.setState(
      {
        activeEmploymentType,
      },
      this.getData,
    )
  }

  changeRange = activePackage => {
    this.setState(
      {
        activePackage,
      },
      this.getData,
    )
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getData()
    }
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickJobRetry}>
        Retry
      </button>
    </>
  )

  onClickSearch = () => {
    this.getData()
  }

  renderProfileSuccessView = () => {
    const {name, imageUrl, bio} = this.state
    return (
      <>
        <img src={imageUrl} alt="profile" className="profile-image" />
        <h1>{name}</h1>
        <p>{bio}</p>
      </>
    )
  }

  onClickProfileRetry = () => {
    this.getProfileData()
  }

  onClickJobRetry = () => {
    this.getData()
  }

  renderProfileFailureView = () => (
    <button type="button" onClick={this.onClickProfileRetry}>
      Retry
    </button>
  )

  checkProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {jobsList, searchInput} = this.state
    console.log(jobsList)
    const showJobs = jobsList.length > 0
    return showJobs ? (
      <>
        <div>
          <input
            type="search"
            onChange={this.onChangeInput}
            onKeyDown={this.enterSearchInput}
            value={searchInput}
          />
          <button
            type="button"
            aria-label="search"
            onClick={this.onClickSearch}
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul>
          {jobsList.map(each => (
            <JobCard details={each} key={each.id} />
          ))}
        </ul>
      </>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  checkJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentType, activePackage} = this.state
    return (
      <div className="jobs-bg-container">
        <div className="filters-container">
          <div className="profile-container">{this.checkProfile()}</div>
          <div>
            <FilterJobs
              activeEmploymentType={activeEmploymentType}
              activePackage={activePackage}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeType={this.changeType}
              changeRange={this.changeRange}
            />
          </div>
        </div>
        <div className="jobs-container">{this.checkJobs()}</div>
      </div>
    )
  }
}
export default AllJobs
