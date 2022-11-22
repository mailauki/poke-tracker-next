import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Person() {
  const { query } = useRouter()

  return (
    <main className={styles.main}>
      <h1>ID: {query.id}</h1>
    </main>
  )
}