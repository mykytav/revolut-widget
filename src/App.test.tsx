import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('./hooks/useIntervalWithInitialCbCall', () => ({
  useIntervalWithInitialCbCall: jest.fn(),
}));

describe('App', () => {
  it('should render App', async () => {
    render(<App />);

    expect(screen.getByText(/market order 1\$ = 0 €/i)).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sell usd/i })).toBeInTheDocument();
    expect(screen.queryAllByRole('combobox').length).toBe(2);
    expect(screen.queryAllByRole('textbox').length).toBe(2);
    expect(screen.queryAllByRole('button').length).toBe(2);
  });
});
