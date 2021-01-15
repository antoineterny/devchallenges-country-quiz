import React from "react"

class StartPage extends React.Component {
  state = { type: "capital" }
  onChangeHandler(e) {
    this.setState({ type: e.target.value })
  }
  render() {
    return (
      <form onSubmit={e => this.props.onStartSubmit(e, this.state.type)}>
        <input
          type="radio"
          id="capital"
          name="type"
          value="capital"
          onChange={e => this.onChangeHandler(e)}
          defaultChecked
        />
        <label htmlFor="capital">Capital quiz</label>
        <br />
        <br />
        <input
          type="radio"
          id="flag"
          name="type"
          value="flag"
          onChange={e => this.onChangeHandler(e)}
        />
        <label htmlFor="flag">Flag quiz</label>
        <br />
        <br />
        <input type="submit" value="Start Quiz" />
      </form>
    )
  }
}

export default StartPage
