import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import AccountMenu from '../components/AccountMenu';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';

const store = createStore(rootReducer);

describe('AccountMenu Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <AccountMenu />
      </Provider>
    );
  });
});
