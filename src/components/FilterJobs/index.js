import './index.css'

const FilterJobs = props => {
  const renderEmploymentList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachType => {
      const {changeType} = props
      const onClickType = () => {
        changeType(eachType.employmentTypeId)
      }

      return (
        <li key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            onClick={onClickType}
          />
          <label htmlFor={eachType.employmentTypeId}>{eachType.label}</label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1>Type of Employment</h1>
      <ul className="type-list">{renderEmploymentList()}</ul>
    </>
  )

  const renderSalaryList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(each => {
      const {changeRange} = props
      const onClickRadio = () => changeRange(each.salaryRangeId)
      return (
        <li key={each.salaryRangeId}>
          <input type="radio" id={each.salaryRangeId} onChange={onClickRadio} />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRanges = () => (
    <>
      <h1>Salary Ranges</h1>
      <ul className="range-list">{renderSalaryList()}</ul>
    </>
  )

  return (
    <>
      {renderEmploymentTypes()}
      {renderSalaryRanges()}
    </>
  )
}
export default FilterJobs
