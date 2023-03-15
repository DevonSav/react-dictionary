import React from 'react';
import WordDetails from './WordDetails';


function findProp(obj, prop, defval){
	if (typeof defval == 'undefined') {
		defval = null;
	}
	prop = prop.split('.');
	for (var i = 0; i < prop.length; i++) {
		if(typeof obj[prop[i]] == 'undefined') {
			return defval;
		}
		obj = obj[prop[i]];
	}
	return obj;
}


/**
 * Displays a input field that takes a word and will display the definition and example usage.
 */
export default class DictionaryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			word: "",
			definition: "ERR",
			examples: "ERR"
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({word: event.target.value});
	}

	handleSubmit(event) {
		console.log("Submitted word: " + this.state.word)
		const uri = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + this.state.word + "?key=" + process.env.REACT_APP_DICTIONARY_API_KEY;

		fetch(uri)
			.then(res => res.json())
			.then( (result) => {
					console.log("Definition: " + result[0].shortdef);
					//console.log("Usage: " + JSON.parse("[{" + result + "}]").toString());
					console.log("Usage: " + result[0].suppl["examples"]);
					//TODO: voluminous
					this.setState({
						isLoaded: true,
						definition: result[0].shortdef,
						//examples: result[0].suppl.examples[0]
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);

		event.preventDefault();
	}

	render() {
		let data = <h3>ERROR, Something went wrong.</h3>;
		const { error, isLoaded, definition, examples } = this.state;

		if (error) {
			data = (
				<div>
					Error: {error.message}
				</div>
			);
		} else if (!isLoaded) {
			data = (
				<div>
					Loading...
				</div>
			);
		} else {
			data = (
				<WordDetails definition={definition.toString()} usage={examples.toString()}/>
			);
		}
		return (
			<div className="dictionary">
				<h3 id="main-heading">Dictionary API Call</h3>
				<form onSubmit={this.handleSubmit}>
					<p>Word Input:</p>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
					<input type="submit" value="Submit" />
				</form>
				<br></br>
				{data}
			</div>
		);
	}
}

/** REFERENCES
 * https://reactjs.org/docs/forms.html
 * https://stackoverflow.com/questions/9463233/how-to-access-nested-json-data
 * https://stackoverflow.com/questions/73866766/how-to-retrieve-examples-from-merriam-webster-dictionary-api-in-reactjs
 */


