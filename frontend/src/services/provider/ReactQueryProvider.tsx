import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
    children: React.ReactNode;
}

const ReactQueryProvider: React.FC<Props> = ({ children }) => {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
            },
        },
    });

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;