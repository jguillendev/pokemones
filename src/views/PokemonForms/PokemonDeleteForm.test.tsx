import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonDeleteForm from './PokemonDeleteForm';
import { RecoilRoot } from 'recoil';
import { PokemonService } from '../../core/services/PokemonService';
import settings from '../../core/settings';

test('renders PokemonDeleteForm', async () => {

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
            <PokemonDeleteForm id={createResult.data.id}/>
        </RecoilRoot>
    );

    // prueba inmediata de render
    const loadingText = screen.getByText(/cargando.../i);
    expect(loadingText).toBeInTheDocument();

    expect(await screen.findByText("Eliminar Pokemon")).toBeInTheDocument();
    
    expect(await screen.findByText(/ID:/i)).toBeInTheDocument();
    expect(await screen.findByText(createResult.data.id)).toBeInTheDocument();

    expect(await screen.findByText(/Nombre:/i)).toBeInTheDocument();
    expect(await screen.findByText(createResult.data.name)).toBeInTheDocument();

    expect(await screen.findByText(/Ataque:/i)).toBeInTheDocument();
    expect(await screen.findByText(createResult.data.attack)).toBeInTheDocument();

    expect(await screen.findByText(/Defensa:/i)).toBeInTheDocument();
    expect(await screen.findByText(createResult.data.defense)).toBeInTheDocument();

    expect(await screen.findByText("Eliminar")).toBeInTheDocument();
    expect(await screen.findByText("Cancelar")).toBeVisible();

    await service.deleteAsync(createResult.data.id);

});