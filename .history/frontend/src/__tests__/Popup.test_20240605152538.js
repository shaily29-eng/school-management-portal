import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Popup from '../components/Popup';

const mockDispatch = jest.fn();
const mockState = { /* Define your initial state here */ };

const mockStore = {
  getState: () => mockState,
  dispatch: mockDispatch,
};

describe('Popup Component', () => {
  test('renders success message correctly', () => {
    render(
      <Provider store={mockStore}>
        <Popup message="Done Successfully" />
      </Provider>
    );

    const alert = screen.getByText(/Done Successfully/i);
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-filledSuccess');
  });

  test('renders error message correctly', () => {
    render(
      <Provider store={mockStore}>
        <Popup message="Something went wrong" />
      </Provider>
    );

    const alert = screen.getByText(/Something went wrong/i);
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-filledError');
  });

  test('closes the popup on close button click', () => {
    render(
      <Provider store={mockStore}>
        <Popup message="Done Successfully" />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Add your assertion here for close button click behavior
  });
});
