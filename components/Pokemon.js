import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function PersonComponent({ pokemon }) {
  const [sprites, setSprites] = React.useState("")

  React.useEffect(() => {
    if(pokemon.url) {
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        setSprites(data.sprites)
      })
    }
  }, [pokemon])

  return (
    <li className={styles.card}>
      <Link href="/pokemon/[id]" as={`/pokemon/${pokemon.name}`}>
        <img src={sprites ? sprites.front_default : ""} />
        <p>{pokemon.name}</p>
      </Link>
    </li>
  )
}