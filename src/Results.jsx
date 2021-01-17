import "./Results.scss"
import React from "react"

const Results = ({ score, initializeState }) => {
  return (
    <div className="Results">
        <h2>Results</h2>
        <p>
          You got <span className="score">{score}</span> correct answers
        </p>
      <button onClick={initializeState}>Try again</button>
    </div>
  )
}

export default Results
