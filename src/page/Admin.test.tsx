import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Admin from './Admin';

test('testing Admin Page', () => {
  render(
    <RecoilRoot>
        <Admin />
    </RecoilRoot>
  );
  const linkElement = screen.getByText(/Listado de Pokemon/i);
  expect(linkElement).toBeInTheDocument();
});