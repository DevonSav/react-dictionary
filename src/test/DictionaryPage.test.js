import React from 'react';
import DictionaryPage from '../components/DictionaryPage';
import renderer from 'react-test-renderer';


/**
 * FIXME: Used for testing the fetch function
 */
function forTestingFetch() {
	const word = "voluminous";
	const uri = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=" + process.env.REACT_APP_DICTIONARY_API_KEY;

	return fetch(uri)
}

test('renders correctly', () => {
	const tree = renderer
	.create(<DictionaryPage/>)
	.toJSON();
	expect(tree).toMatchSnapshot();
});


test('shortdef was not undefined', () => {
	return forTestingFetch()
		.then(res => res.json())
		.then (res => {
				const jsonObj = res;
				// Get short definition
				let shortdef = jsonObj[0]['shortdef'];
				expect(shortdef).not.toBe(undefined);
			},
			(error) => {
				// Do something
				return error;
			}
		);
});

test('shortdef was expected data', () => {
	return forTestingFetch()
		.then(res => res.json())
		.then (res => {
				const jsonObj = res;
				// Get short definition
				let shortdef = jsonObj[0]['shortdef'];
				expect(shortdef).toStrictEqual(["having or marked by great volume or bulk : large; also : full", "numerous", "filling or capable of filling a large volume or several volumes"]);
			},
			(error) => {
				// Do something
				return error;
			}
		);
});
