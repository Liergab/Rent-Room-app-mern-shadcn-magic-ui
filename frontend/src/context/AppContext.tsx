/* eslint-disable react-refresh/only-export-components */
import { ValidateToken } from '@/services/api/Auth';
import React, { useContext, useEffect, useState } from 'react';

type AppContext = {
    isLoggin: boolean;
    setIsLoggin:React.Dispatch<React.SetStateAction<boolean>>
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggin, setIsLoggin] = useState<boolean>(false);
   
    const { data, isLoading, isError} = ValidateToken();
   

    useEffect(() => {
        if (!isLoading) {
            setIsLoggin(!isError && data);
        }
    }, [isLoading, isError, data]);


    return (
        <AppContext.Provider value={{ isLoggin, setIsLoggin }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
