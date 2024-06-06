import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SeeNotice from '../components/SeeNotice';

// Mock the redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SeeNotice Component', () => {
  let store;

  beforeEach(() => {
    // Mock initial state for the store
    const initialState = {
      user: {
        currentUser: { _id: 'userId', school: { _id: 'schoolId' } },
        currentRole: 'Admin',
      },
      notice: {
        noticesList: [
          { _id: 'noticeId1', title: 'Notice 1', details: 'Details 1', date: '2024-06-05T00:00:00Z' },
          { _id: 'noticeId2', title: 'Notice 2', details: 'Details 2', date: '2024-06-06T00:00:00Z' },
        ],
        loading: false,
        error: null,
        response: false,
      },
    };
    store = mockStore(initialState);
  });

  it('renders notices list', () => {
    render(
      <Provider store={store}>
        <SeeNotice />
      </Provider>
    );

    // Verify that the notices are rendered
    expect(screen.getByText('Notice 1')).toBeInTheDocument();
    expect(screen.getByText('Notice 2')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
