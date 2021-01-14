import "./App.scss"
import React from "react"

class App extends React.Component {
  state = {
    countries: [],
    region: "Asia", // Africa Americas Asia Europe Oceania
    difficulty: 10, // has to be > to the nb of questions !
    nbQuestions: 5,
    questions: [],
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
    console.log(this.state.countries)
    const questions = this.shuffle(countries).splice(0, this.state.nbQuestions)
    this.setState({ questions: questions })
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
        <h1>{this.state.region === "" ? "World" : this.state.region}</h1>
        <ol>
          {this.state.questions.map(country => (
            <li key={country.name}>
              <img src={country.flag} alt="flag" />
              <b>{country.name}</b> {country.capital}{" "}
              <em>({Math.round(country.population / 1000000)} M)</em>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default App
