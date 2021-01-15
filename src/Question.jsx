import React from "react"

class Question extends React.Component {
  state = {
    countries: this.props.countries,
    questions: this.props.questions,
    possibles: [],
  }
  componentDidMount() {
    const { countries, questions, turn } = this.props
    const answerIndex = countries.findIndex(q => q.name === questions[turn - 1].name)
    console.log("answerIndex", answerIndex)
    let possibles = [...countries]
    possibles.splice(answerIndex, 1)
    let shuffled = this.props.shuffle(possibles)
    this.setState({ possibles: shuffled })
  }
  render() {
    const { questions, quizType, turn } = this.props
    if (quizType === "capital") {
      return <h2>{questions[turn - 1].capital} is the capital of</h2>
    } else if (quizType === "flag") {
      return (
        <div>
          <img src={questions[turn - 1].flag} alt="mystery flag" />
          <h2>Which country does this flag belong to? </h2>
        </div>
      )
    }
  }
}

export default Question
