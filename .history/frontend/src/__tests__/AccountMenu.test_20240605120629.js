import React from 'react';
import { render } from '@testing-library/react';
import AccountMenu from '../components/AccountMenu';

describe('AccountMenu Component', () => {
  test('renders without crashing', () => {
    render(<AccountMenu />);
  });
});