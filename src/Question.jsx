import "./Question.scss"
// import translation_fr from "./translation_fr"
import React from "react"

class Question extends React.Component {
  state = {
    countries: this.props.countries,
    questions: this.props.questions,
    displayed: [],
    turn: 1,
    correctAnswer: "",
    answerSubmitted: false,
  }
  componentDidMount() {
    this.shuffleCountries(0)
  }
  shuffleCountries(turn) {
    const { countries, questions } = this.props
    const answerIndex = countries.findIndex(q => q.name === questions[turn].name)
    let possibles = [...countries]
    possibles.splice(answerIndex, 1)
    this.props.shuffle(possibles)
    possibles.splice(3, possibles.length - 1)
    possibles.push(questions[turn])
    this.props.shuffle(possibles)
    possibles[0].letter = "A"
    possibles[1].letter = "B"
    possibles[2].letter = "C"
    possibles[3].letter = "D"
    this.setState({ displayed: possibles })
    this.setState({ correctAnswer: questions[turn] })
  }
  render() {
    const { questions, quizType } = this.props
    const title =
      quizType === "capital" ? (
        <h2>
          {
          // translation_fr[questions[this.state.turn - 1].capital] ||
            questions[this.state.turn - 1].capital}{" "}
          is the capital of
        </h2>
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
          this.setState({ turn: this.state.turn + 1, answerSubmitted: false })
          if (this.state.turn < this.props.nbQuestions) this.shuffleCountries(this.state.turn)
        }}
        style={!this.state.answerSubmitted ? { display: "none" } : null}
      >
        Next
      </button>
    )

    return (
      <div className="Question">
        {title}
        <ol>
          {this.state.displayed.map(answer => (
            <li
              key={answer.letter}
              onClick={
                this.state.answerSubmitted
                  ? null
                  : e => {
                      this.setState({ answerSubmitted: answer })
                      answer.name === this.state.correctAnswer.name
                        ? this.props.incrementScore()
                        : console.log("incorrect")
                    }
              }
              className={
                !this.state.answerSubmitted
                  ? null
                  : answer.name === this.state.correctAnswer.name
                  ? "correct"
                  : answer === this.state.answerSubmitted
                  ? "incorrect"
                  : null
              }
            >
              <span className="letter">{answer.letter}</span>
              <span>{answer.name}</span>
            </li>
          ))}
        </ol>
        {nextButton}
      </div>
    )
  }
}

export default Question
