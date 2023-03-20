import { render, screen } from '@testing-library/react';
import App from '../App';

/**
 * Checks that the dictionary page header is displayed.
 */
test('renders learn react link', () => {
	render(<App />);
	//const linkElement = screen.getByText(/learn react/i);
	const linkElement = screen.getByText(/Dictionary API Call/i);
	expect(linkElement).toBeInTheDocument();
});
