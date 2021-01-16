import './Question.scss'
import React from "react"

class Question extends React.Component {
  state = {
    countries: this.props.countries,
    questions: this.props.questions,
    displayed: [],
    turn: 1,
    currentAnswer: "",
  }
  componentDidMount() {
    this.shuffleCountries(0)
  }
  shuffleCountries(turn) {
    const { countries, questions } = this.props
    const answerIndex = countries
      .findIndex(q => q.name === questions[turn].name)
    console.log("answerIndex", answerIndex)
    console.log("answer", questions[turn].name)
    let possibles = [...countries]
    possibles.splice(answerIndex, 1)
    this.props.shuffle(possibles)
    possibles.splice(3, possibles.length - 1)
    possibles.push(questions[turn])
    this.props.shuffle(possibles)
    this.setState({ displayed: possibles })
    this.setState({ currentAnswer: questions[turn] })
  }
  render() {
    const { questions, quizType } = this.props
    const title =
      quizType === "capital" ? (
        // <h2>{questions[this.state.turn - 1].capital} is the capital of</h2>
        <h2>{questions[this.state.turn - 1].name} is </h2>
      ) : (
        <div>
          <img src={questions[this.state.turn - 1].flag} alt="mystery flag" />
          <h2>Which country does this flag belong to? </h2>
        </div>
      )

    const nextButton = (
      <button
        onClick={() => {
          this.props.nextQuestion()
          this.setState({ turn: this.state.turn + 1 })
          if(this.state.turn < this.props.nbQuestions) this.shuffleCountries(this.state.turn)
        }}
      >
        Next
      </button>
    )

    return (
      <div className="Question">
        {title}
        <ol type="A">
          {this.state.displayed.map(answer => (
            <li key={answer.name}>{answer.name}</li>
          ))}
        </ol>
        {nextButton}
      </div>
    )
  }
}

export default Question
