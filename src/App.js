import "./App.scss"
import { ReactComponent as Logo } from "./undraw_adventure_4hum 1.svg"
import React from "react"
import Question from "./Question"
import StartPage from "./StartPage"

class App extends React.Component {
  state = {
    countries: [],
    region: "", // Africa Americas Asia Europe Oceania
    difficulty: 5, // has to be > to the nb of questions !
    nbQuestions: 3,
    questions: [],
    quizType: "",
    turn: 0,
    score: 0,
  }

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
    const questions = this.shuffle(countries).splice(0, this.state.nbQuestions)
    this.setState({ questions: questions })
  }

  onStartSubmit = (e, type) => {
    e.preventDefault()
    console.log(type)
    this.setState({ quizType: type, turn: 1 })
  }

  // Fisher–Yates shuffle
  shuffle(originalArray) {
    let array = [...originalArray]
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
          <Logo />
        </div>
        <div className="quiz-body">
          {this.state.turn === 0 ? (
            <StartPage onStartSubmit={this.onStartSubmit} />
          ) : this.state.turn === this.state.nbQuestions ? (
            <h2>Gagné / perdu</h2>
          ) : (
            <Question
              countries={this.state.countries}
              questions={this.state.questions}
              quizType={this.state.quizType}
              turn={this.state.turn}
              shuffle={this.shuffle}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
