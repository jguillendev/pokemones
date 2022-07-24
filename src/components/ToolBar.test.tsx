import { render, screen } from '@testing-library/react';
import ToolBar from './ToolBar';

test('renders ToolBar', () => {
  render(<ToolBar/>);
  const actionButton = screen.getByText(/Nuevo/i);
  expect(actionButton).toBeInTheDocument();
  const inputSearch = screen.getByPlaceholderText(/Buscar/i);
  expect(inputSearch).toBeInTheDocument();
});