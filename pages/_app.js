import { useState, useMemo } from 'react'
import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createTheme, ThemeProvider, useMediaQuery, CssBaseline } from '@mui/material'
import { AppWrapper } from '../context/AppContext'

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light"
      }
    }), [prefersDarkMode]
  )

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ThemeProvider>
    </SessionContextProvider>
  )
}

export default MyApp
