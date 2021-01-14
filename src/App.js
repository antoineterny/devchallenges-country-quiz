import "./App.scss"
import React from "react"

class App extends React.Component {
  state = {
    countries: [],
    region: "Africa",
    nbCountries: 8,
  }

  componentDidMount() {
    const base = "https://restcountries.eu/rest/v2/"
    const region = this.state.region === "" ? "all/" : "region/" + this.state.region
    const fields = "?fields=name;capital;flag;population"
    // fetch("https://restcountries.eu/rest/v2/region/Europe?fields=name;capital;flag;population")
    // fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;flag;population")
    fetch(base + region + fields)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        this.setState({ countries: data })
      })
  }

  // Fisher–Yates shuffle
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  ShuffledList = list => {
    return this.shuffle(list).map(country => (
      <li key={country.name}>
        <img src={country.flag} alt="flag" />
        <b>{country.name}</b> {country.capital}{" "}
        <em>({Math.round(country.population / 1000000)} M)</em>
      </li>
    ))
  }

  render() {
    const countryList = this.state.countries
      // .filter(country => country.population > 9000000)
      .sort((a, b) => (a.population < b.population ? 1 : -1))
      .splice(0, this.state.nbCountries)
    return (
      <div className="App">
        <h1>{this.state.region === "" ? "World" : this.state.region}</h1>
        <ol>{this.ShuffledList(countryList)}</ol>
      </div>
    )
  }
}

export default App

// Africa Americas Asia Europe Oceania