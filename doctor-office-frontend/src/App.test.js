import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Doctor\'s Office Appointments header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Doctor's Office Appointments/i);
  expect(headerElement).toBeInTheDocument();
});

