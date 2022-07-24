import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';


test('renders SearchBox', () => {
  render(<SearchBox onChange={()=>{console.log("change serch box value")}}/>);
  const inputSearch = screen.getByPlaceholderText(/Buscar/i);
  expect(inputSearch).toBeInTheDocument();
});