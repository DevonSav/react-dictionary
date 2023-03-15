import React from 'react';

/**
 * Displays a input field that takes a word and will display the definition and example usage.
 */
export default class DictionaryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			word: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({word: event.target.value});
	}

	handleSubmit(event) {
		console.log("Submitted word: " + this.state.word)

		fetch("https://api.example.com/items")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.items
					});
				},
				// Note: it's important to handle errors here instead of a catch() block so that
				// we don't swallow exceptions from actual bugs in components.
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
		let res = <h3>test</h3>;
		//const { error, isLoaded, items } = this.state;

		//if (error) {
		//	res = (<div>Error: {error.message}</div>);
		//} else if (!isLoaded) {
		//	res = (<div>Loading...</div>);
		//} else {
		//	res = (
		//		<ul>
		//			{items.map(item => (
		//				<li key={item.name}>
		//					{item.name} {item.price}
		//				</li>
		//			))}
		//		</ul>
		//	);
		//}
		return (
			<div className="dictionary">
				<h3 id="main-heading">Dictionary API Call</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						Word Input:
						<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				{res}
			</div>
		);
	}

	//render() {
	//	return (
	//		<div className="dictionary">
	//			<h3 id="main-heading">Dictionary API Call</h3>
	//		</div>
	//	);
	//}
}

/** REFERENCES
 * https://reactjs.org/docs/forms.html
 */


