import React from 'react';

function WordDetails(props) {

	let defArr = props.definition;
	let defElem = (
		<ul>
			<li>Invalid word or incorrect definition data.</li>
		</ul>
	);

	if (defArr != undefined) {
		defElem = (
			<ul>
				{defArr.map((item, index) => (
					<li key={index}>
						{item}
					</li>
				))}
			</ul>
		);
	}

	return (
		<div className="word-details">
			<div className="word-definition">
				<h3>Definition</h3>
				<div className="definition-list">
					{defElem}
				</div>
			</div>
			<div className="word-usage">
				<h3>Usage</h3>
				<p>{props.usage}</p>
			</div>
		</div>
	);
}

export default WordDetails;
