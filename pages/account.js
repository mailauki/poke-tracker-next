import { useSession } from '@supabase/auth-helpers-react'
import styles from '../styles/Home.module.css'
import Account from '../components/Account'
import Header from '../components/Header'

export default function Login() {
  const session = useSession()

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div style={{ padding: '50px 0 100px 0' }}>
          <Account session={session} />
        </div>
      </main>
    </div>
  )
}