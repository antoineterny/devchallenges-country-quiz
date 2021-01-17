import "./App.scss"
import { ReactComponent as LogoTravel } from "./undraw_adventure_4hum 1.svg"
import { ReactComponent as LogoResults } from "./undraw_winners_ao2o 2.svg"
import React from "react"
import Question from "./Question"
import StartPage from "./StartPage"
import Results from "./Results"

class App extends React.Component {
  state = {
    countries: [],
    region: "", // Africa Americas Asia Europe Oceania
    difficulty: 50, // most populous in list
    nbQuestions: 20,
    questions: [],
    quizType: "capital",
    turn: 0,
    score: 0,
  }
  initialState = this.state

  componentDidMount() {
    this.prepareQuestions()
  }

  async prepareQuestions() {
    const base = "https://restcountries.eu/rest/v2/"
    const region = this.state.region === "" ? "all/" : "region/" + this.state.region
    const fields = "?fields=name;capital;flag;population"
    let countries = await fetch(base + region + fields)
    countries = await countries.json()
    countries = await countries
      .sort((a, b) => (a.population < b.population ? 1 : -1))
      .splice(0, this.state.difficulty)
    this.setState({ countries: countries })
    const questions = [...countries]
    this.shuffle(questions).splice(this.state.nbQuestions, questions.length - 1)
    this.setState({ questions: questions })
  }

  onStartSubmit = (e, type) => {
    e.preventDefault()
    console.log(type)
    this.setState({ quizType: type, turn: 1 })
  }

  nextQuestion = () => {
    this.setState({ turn: this.state.turn + 1 })
  }
  incrementScore = () => this.setState({ score: this.state.score + 1 })

  initializeState = () => {
    this.setState(this.initialState)
    this.prepareQuestions()
  }

  // Fisher–Yates shuffle
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  render() {
    return (
      <div className="App">
        <div className="quiz-header">
          <h1>Country quiz</h1>
          {this.state.turn < this.state.nbQuestions + 1 ? (
            <LogoTravel className="svg-travel" />
          ) : (
            <LogoResults className="svg-results" />
          )}
        </div>
        <div className="quiz-body">
          {this.state.turn === 0 ? (
            <StartPage onStartSubmit={this.onStartSubmit} />
          ) : this.state.turn === this.state.nbQuestions + 1 ? (
            <Results score={this.state.score} initializeState={this.initializeState} />
          ) : (
            <Question
              countries={this.state.countries}
              questions={this.state.questions}
              quizType={this.state.quizType}
              turn={this.state.turn}
              nbQuestions={this.state.nbQuestions}
              shuffle={this.shuffle}
              nextQuestion={this.nextQuestion}
              incrementScore={this.incrementScore}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
