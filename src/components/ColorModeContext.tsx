// ColorModeContext.tsx
import { createContext, useMemo, useState, FC, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

interface ColorModeContextProps {
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
    toggleColorMode: () => {},
});

interface ColorModeProviderProps {
    children: ReactNode;
}

const ColorModeProvider: FC<ColorModeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light')),
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // Light mode palette
                            primary: { main: '#7AA7AB' },
                            secondary: { main: '#139DAB' },
                            background: {
                                default: '#f5f5f5',
                                paper: '#ffffff',
                            },
                            text: {
                                primary: '#000000',
                                secondary: '#424242',
                            },
                        }
                        : {
                            // Dark mode palette
                            primary: { main: '#969696' },
                            secondary: { main: '#969696' },
                            background: {
                                default: '#424242',
                                paper: '#969696',
                            },
                            text: {
                                primary: '#ffffff',
                                secondary: '#969696',
                            },
                        }),
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ColorModeProvider;
