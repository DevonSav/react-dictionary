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
			examples: "Unavailable - see FIXME comment"
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
			.then (res => {

					// Logs the returned object to view it's structure for debugging (see below comment)
					console.log(res);
					const jsonObj = res;

					// Short definition is easily retrieved
					let shortdef = jsonObj[0]['shortdef'];
					console.log(shortdef);

					/* FIXME: Getting examples is broken(?)
					The API documentation appears to be incorrect (the example word 'voluminous' doesn't even return the same output they show)
					The formatting also seems to be different depending on the word?
					Words 'test' and 'voluminous' don't return the same json structure(?) making it extremely difficult to parse the data reliably.
					The commented out log statements below don't seem to work with every word for example.
					*/

					//console.log(jsonObj[0]['def'][0]['sseq'][0][0][1]['dt'][0][1].replace("{bc}", ""));
					//let example1 = jsonObj[0]['def'][0]['sseq'][0][0][1]['dt'][1][1][0]['t'].replace("{wi}", "").replace("{/wi}", "");
					//console.log(example1);

					//let example2 = jsonObj[0]['def'][0]['sseq'][0][0][1]['sdsense']['dt'][1][1][0]['t'].replace("{wi}", "").replace("{/wi}", "");
					//console.log(example2);

					this.setState({
						isLoaded: true,
						definition: shortdef
						//examples: example1
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
				<WordDetails definition={definition} usage={examples.toString()}/>
			);
		}
		return (
			<div className="dictionary">
				<h2 id="main-heading">Dictionary API Call</h2>
				<form onSubmit={this.handleSubmit}>
					<p>Word Input:</p>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
					<br></br>
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
 * Some user with a similar issue: https://stackoverflow.com/questions/73866766/how-to-retrieve-examples-from-merriam-webster-dictionary-api-in-reactjs
 */