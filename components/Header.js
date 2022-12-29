import styles from '../styles/Home.module.css'
import Pokeball from '../components/icons/Pokeball'

export default function Header({ onOpen }) {
  return (
    <header className={styles.header}>
      <div onClick={() => onOpen(false)} className={styles.title}>
        <Pokeball size="2rem" />

        <h1>
          Pokemon
        </h1>
      </div>
    </header>
  )
}