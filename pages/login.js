import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useTheme } from '@mui/material'
import styles from '../styles/Home.module.css'
import Account from '../components/Account'
import Header from '../components/Header'

export default function Login() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div style={{ padding: '50px 0 100px 0' }}>
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme={theme.palette.mode} />
        </div>
      </main>
    </div>
  )
}