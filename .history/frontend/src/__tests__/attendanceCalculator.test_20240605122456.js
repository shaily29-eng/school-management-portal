import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ChooseUser from '../pages/ChooseUser';
import rootReducer from '../redux/rootReducer'; // Import your root reducer

describe('ChooseUser component', () => {
  test('renders without crashing', () => {
    const store = createStore(rootReducer); // Create a mock store

    const { getByText } = render(
      <Provider store={store}>
        <ChooseUser visitor="guest" />
      </Provider>
    );

    expect(getByText('Admin')).toBeInTheDocument();
    expect(getByText('Student')).toBeInTheDocument();
    expect(getByText('Teacher')).toBeInTheDocument();
  });

  test('navigates to correct route when clicking on user types', () => {
    const store = createStore(rootReducer); // Create a mock store

    const { getByText } = render(
      <Provider store={store}>
        <ChooseUser visitor="guest" />
      </Provider>
    );

    fireEvent.click(getByText('Admin'));
    fireEvent.click(getByText('Student'));
    fireEvent.click(getByText('Teacher'));

    // Add your assertions here based on your specific navigation logic
  });

  // Add more tests as needed
});
