import React from 'react'
import styles from '../styles/Home.module.css'

export default function PersonComponent({ pokemon, open, onOpen }) {
  const [info, setInfo] = React.useState(null)

  React.useEffect(() => {
    if(pokemon.url) {
      fetch(pokemon.url)
      .then((r) => r.json())
      .then((data) => {
        setInfo(data)
      })
    }
  }, [pokemon])

  function padZero(id) {
    if(id <= 9) {
      return "00" + id
    }
    else if(id >= 9 && id <= 99) {
      return "0" + id
    }
    else return id
  }

  return (
    <li className={styles.card} onClick={() => onOpen(info.id)}>
      <img src={info ? info.sprites.front_default : ""} width={open ? "200px" : ""} />
      <h3>{pokemon.name}</h3>
      {info ? <p>{`#${padZero(info.id)}`}</p> : <></>}
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