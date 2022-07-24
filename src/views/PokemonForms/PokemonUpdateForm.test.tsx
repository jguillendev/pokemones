import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonUpdateForm from './PokemonUpdateForm';
import { RecoilRoot } from 'recoil';
import { PokemonService } from '../../core/services/PokemonService';
import settings from '../../core/settings';

test('renders PokemonUpdateForm', async () => {

    const service = new PokemonService(settings, 1);
    const createResult = await service.createAsync({
        idAuthor: 1,
        name: "Pikamon",
        image: "https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png",
        defense: 40,
        attack: 80,
        hp: 100,
        type: "custom"
    });

    render(
        <RecoilRoot>
            <PokemonUpdateForm id={createResult.data.id}/>
        </RecoilRoot>
    );

    // prueba inmediata de render
    const loadingText = screen.getByText(/cargando.../i);
    expect(loadingText).toBeInTheDocument();

    expect(await screen.findByText("Actualizar Pokemon")).toBeInTheDocument();
    
    expect(await screen.findByText(/Nombre:/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(createResult.data.name)).toBeInTheDocument();

    expect(await screen.findByText(/Url:/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(createResult.data.image)).toBeInTheDocument();

    expect(await screen.findByText(/Ataque:/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(createResult.data.attack)).toBeInTheDocument();

    expect(await screen.findByText(/Defensa:/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(createResult.data.defense)).toBeInTheDocument();

    expect(await screen.findByText("Guardar")).toBeVisible();
    expect(await screen.findByText("Cancelar")).toBeVisible();

    await service.deleteAsync(createResult.data.id);

});