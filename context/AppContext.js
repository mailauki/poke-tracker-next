import { createContext, useContext, useMemo } from 'react'
import { createTheme, useMediaQuery } from '@mui/material'

const AppContext = createContext();

export function AppWrapper({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light"
      }
    }), [prefersDarkMode]
  )

  let sharedState = {
    theme: theme
}
  

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}