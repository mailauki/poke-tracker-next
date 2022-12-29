import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { CircularProgress, Box } from '@mui/material'

export default function PersonComponent({ pokemon, open, onOpen }) {
  const [info, setInfo] = React.useState(null)
  const size = open ? 200 : 100

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
      {info ? (
        <Image 
          src={info.sprites.front_default} 
          alt={pokemon ? pokemon.name : "pokemon sprite"} 
          width={size} height={size} 
        />
      ) : (
        <Box 
          width={`${size}px`} 
          height={`${size}px`} 
          sx={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CircularProgress />
        </Box>
      )}

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