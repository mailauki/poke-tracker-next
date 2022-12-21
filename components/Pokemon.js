import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function PersonComponent({ pokemon, open, onOpen }) {
  const [sprites, setSprites] = React.useState("")
  const [info, setInfo] = React.useState(null)

  React.useEffect(() => {
    if(pokemon.url) {
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        // setSprites(data.sprites)
        setInfo(data)
      })
    }
  }, [pokemon])
  console.log(info)

  return (
    <li className={styles.card} onClick={() => onOpen(!open)}>
      <img src={info ? info.sprites.front_default : ""} width={open ? "200px" : ""} />
      <h3>{pokemon.name}</h3>
      <div className={styles.row}>
        {info && open ? (
          info.types.map((type) => <p>{type.type.name}</p>)
        ) : (
          <></>
        )}
      </div>
    </li>
  )
}