/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';

test('testing PageContainer', async () => {
    const {container} = render(    
        <PageContainer>
            <h1>dummy text</h1>
        </PageContainer>
    );
    
    const containers = container.getElementsByClassName("page-container");
    expect(containers.length).toBe(1);

    const dummyText = screen.getByText(/dummy text/i);
    expect(dummyText).toBeInTheDocument();

});