import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTitle from './PageTitle';

test('renders PageTitle', () => {
  render(<PageTitle title="Listado de Pokemon"/>);
  const element = screen.getByText(/Listado de Pokemon/i);
  expect(element).toBeInTheDocument();
});