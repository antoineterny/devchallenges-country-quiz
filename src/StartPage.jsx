import "./StartPage.scss"
import React from "react"

class StartPage extends React.Component {
	state = { type: "capital", region: "World", nbQuestions: 5, difficulty: 20 }
	onTypeChange(e) {
		this.setState({ type: e.target.value })
	}
	onRegionChange(e) {
		this.setState({ region: e.target.value })
	}
	onNumberChange(e) {
		this.setState({ nbQuestions: e.target.value })
	}
	onDifficultyChange(e) {
		this.setState({ difficulty: e.target.value })
	}
	render() {
		return (
			<form
				className="StartPage-form"
				onSubmit={e => this.props.onStartSubmit(e, this.state)}
			>
				<h2>Quiz type</h2>
				<div className="fieldset">
					<input
						type="radio"
						id="capital"
						name="type"
						value="capital"
						onChange={e => this.onTypeChange(e)}
						defaultChecked
					/>
					<label htmlFor="capital">Capital quiz</label>
					<input
						type="radio"
						id="flag"
						name="type"
						value="flag"
						onChange={e => this.onTypeChange(e)}
					/>
					<label htmlFor="flag">Flag quiz</label>
				</div>

				<h2>Region</h2>
				<div className="fieldset">
					<input
						type="radio"
						name="region"
						id="World"
						value="World"
            onChange={e => this.onRegionChange(e)}
            defaultChecked
					/>
					<label htmlFor="World">World</label>

					<input
						type="radio"
						name="region"
						id="Africa"
						value="Africa"
						onChange={e => this.onRegionChange(e)}
					/>
					<label htmlFor="Africa">Africa</label>

					<input
						type="radio"
						name="region"
						id="Americas"
						value="Americas"
						onChange={e => this.onRegionChange(e)}
					/>
					<label htmlFor="Americas">Americas</label>

					<input
						type="radio"
						name="region"
						id="Asia"
						value="Asia"
						onChange={e => this.onRegionChange(e)}
					/>
					<label htmlFor="Asia">Asia</label>

					<input
						type="radio"
						name="region"
						id="Europe"
						value="Europe"
						onChange={e => this.onRegionChange(e)}
					/>
					<label htmlFor="Europe">Europe</label>

					<input
						type="radio"
						name="region"
						id="Oceania"
						value="Oceania"
						onChange={e => this.onRegionChange(e)}
					/>
					<label htmlFor="Oceania">Oceania</label>
				</div>

        <h2>Number of questions</h2>
				<div className="fieldset">
					<input
						type="radio"
						name="number"
						id="5"
						value="5"
						onChange={e => this.onNumberChange(e)}
						defaultChecked
					/>
					<label htmlFor="5">5</label>

					<input
						type="radio"
						name="number"
						id="10"
						value="10"
						onChange={e => this.onNumberChange(e)}
					/>
					<label htmlFor="10">10</label>

					<input
						type="radio"
						name="number"
						id="20"
						value="20"
						onChange={e => this.onNumberChange(e)}
					/>
					<label htmlFor="20">20</label>
				</div>

        <h2>Difficulty</h2>
				<div className="fieldset">
					<input
						type="radio"
						name="difficulty"
						id="easy"
						value="20"
						onChange={e => this.onDifficultyChange(e)}
						defaultChecked
					/>
					<label htmlFor="easy">easy</label>

					<input
						type="radio"
						name="difficulty"
						id="normal"
						value="50"
						onChange={e => this.onDifficultyChange(e)}
					/>
					<label htmlFor="normal">normal</label>

					<input
						type="radio"
						name="difficulty"
						id="hard"
						value="150"
						onChange={e => this.onDifficultyChange(e)}
					/>
					<label htmlFor="hard">hard</label>
				</div>

				<input type="submit" value="Start Quiz" />
			</form>
		)
	}
}

export default StartPage
