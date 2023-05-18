import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/App'
import {alpha, CssBaseline} from "@mui/material";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material/styles";

const scrollbarSize = 2, scrollbarColor = '#364041';
const themeOptions: ThemeOptions = {
    components: {
        MuiTypography: {
            defaultProps: {
                // @ts-ignore, here is a bug of MUI
                component: 'div',
                fontFamily: 'XingYeWenRou, serif'
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: alpha(scrollbarColor, 0.1),
                        width: scrollbarSize,
                        height: scrollbarSize,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: scrollbarSize,
                        backgroundColor: alpha(scrollbarColor, 0.2),
                        border: 'none',
                    },
                    '&:hover::-webkit-scrollbar-thumb, & *:hover::-webkit-scrollbar-thumb': {
                        borderRadius: scrollbarSize,
                        backgroundColor: alpha(scrollbarColor, 0.6),
                        border: 'none',
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: scrollbarColor,
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: scrollbarColor,
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: alpha(scrollbarColor, 0.8),
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: 'none',
                    },
                },
            },
        },
    }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={createTheme(themeOptions)}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
)
