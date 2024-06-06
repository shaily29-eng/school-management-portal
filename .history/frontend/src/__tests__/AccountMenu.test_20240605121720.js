import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountMenu from '../components/AccountMenu';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('AccountMenu Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <AccountMenu />
      </Provider>
    );
  });
});
