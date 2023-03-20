import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
	render(<App />);
	//const linkElement = screen.getByText(/learn react/i);
	const linkElement = screen.getByText(/Dictionary API Call/i);
	expect(linkElement).toBeInTheDocument();
});
