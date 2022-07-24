import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonTable from './PokemonTable';
import { RecoilRoot } from 'recoil';

test('renders PokemonTable', () => {
  render(
    <RecoilRoot>
        <PokemonTable/>
    </RecoilRoot>
  );
  const nameColumn = screen.getByText(/Nombre/i);
  expect(nameColumn).toBeInTheDocument();
  const imageColumn = screen.getByText(/Imagen/i);
  expect(imageColumn).toBeInTheDocument();
  const attackColumn = screen.getByText(/Ataque/i);
  expect(attackColumn).toBeInTheDocument();
  const defenseColumn = screen.getByText(/Defensa/i);
  expect(defenseColumn).toBeInTheDocument();
  const actionsColumn = screen.getByText(/Acciones/i);
  expect(actionsColumn).toBeInTheDocument();
});