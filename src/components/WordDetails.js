import React from 'react';

function WordDetails(props) {
	return (
		<div className="word-details">
			<div className="word-definition">
				<h2>Definition</h2>
				<p>{props.definition}</p>
			</div>
			<div className="word-usage">
				<h2>Usage</h2>
				<p>{props.usage}</p>
			</div>
		</div>
	);
}

export default WordDetails;
