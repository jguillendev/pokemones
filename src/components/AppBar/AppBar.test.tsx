/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';
import AppBar from './AppBar';

test('testing Admin Page', async () => {
    const {container} = render(    
        <AppBar />
    );
    
    const icons = container.getElementsByClassName("b-circle");
    expect(icons.length).toBe(3);
});