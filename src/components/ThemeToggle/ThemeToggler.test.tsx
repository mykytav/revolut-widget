import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('should render unchecked toggle', () => {
    const onChange = jest.fn();

    render(<ThemeToggle onChange={onChange} checked={false} />);

    const toggle = screen.getByTestId('theme-toggle');
    const input = toggle.querySelector('input') as HTMLInputElement;

    expect(toggle).toBeInTheDocument();
    expect(input).not.toBeChecked();

    userEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render checked toggle', () => {
    const onChange = jest.fn();

    render(<ThemeToggle onChange={onChange} checked />);

    const toggle = screen.getByTestId('theme-toggle');
    const input = toggle.querySelector('input') as HTMLInputElement;

    expect(toggle).toBeInTheDocument();
    expect(input).toBeChecked();

    userEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
