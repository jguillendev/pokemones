import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonCreateForm from './PokemonCreateForm';
import { RecoilRoot } from 'recoil';

test('renders PokemonCreateForm', () => {
  render(
    <RecoilRoot>
        <PokemonCreateForm/>
    </RecoilRoot>
  );

  const formTitle = screen.getByText(/Nuevo Pokemon/i);
  expect(formTitle).toBeInTheDocument();

  const lblName = screen.getByText(/Nombre:/i);
  expect(lblName).toBeInTheDocument();
  const placeholderName = screen.getByPlaceholderText(/nombre/i);
  expect(placeholderName).toBeInTheDocument();

  const lblUrl = screen.getByText(/Url:/i);
  expect(lblUrl).toBeInTheDocument();
  const placeholderUrl = screen.getByPlaceholderText(/url/i);
  expect(placeholderUrl).toBeInTheDocument();

  const lblAttack = screen.getByText(/Ataque:/i);
  expect(lblAttack).toBeInTheDocument();

  const lblDefense = screen.getByText(/Defensa:/i);
  expect(lblDefense).toBeInTheDocument();

  const btnSave = screen.getByText(/Guardar/i);
  expect(btnSave).toBeInTheDocument();

  const btnCancel = screen.getByText(/Cancelar/i);
  expect(btnCancel).toBeInTheDocument();

});