import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../components/ErrorPage';

describe('ErrorPage Component', () => {
  it('renders error message correctly', () => {
    render(<ErrorPage />);

    expect(screen.getByText('Oops, something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.')).toBeInTheDocument();
  });
});