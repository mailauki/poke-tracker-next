import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Pokeball from '../components/icons/Pokeball'
import { CircularProgress, Box, Chip, Typography, Checkbox } from '@mui/material'

export default function PersonComponent({ pokemon, open, onOpen, checked }) {
  const [info, setInfo] = React.useState(null)
  // const [checked, setChecked] = React.useState(false)
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
    <li 
      className={`${styles.card} ${!open ? styles.open : ""}`} 
      onClick={(e) => {
        e.target.type === "checkbox" ? (
          // setChecked(!checked)
          console.log(info.id)
        ) : (
          onOpen(info.id)
        )
      }}
      style={{ 
        width: open ? "300px" : "150px",
        height: open ? "300px" : "150px"
      }}
    >
      <Box 
        className={styles.row}
        sx={{ justifyContent: "space-between" }}
      >
        <Checkbox 
          icon={<Pokeball size="1.5rem" />}
          checkedIcon={<Pokeball size="1.5rem" />}
          sx={{
            '&.Mui-checked': {
              color: "red"
            }
          }}
          checked={checked ? checked.isCollected : false}
        />

        {info ? (
          <Chip 
            label={`#${padZero(info.id)}`} 
            sx={{ width: "fit-content" }} 
          />
        ) : (
          <></>
        )}
      </Box>

        
      <Box 
        className={styles.sprite}
        width={`${size}px`} 
        height={`${size}px`} 
        sx={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {info ? (
          <Image 
            src={info.sprites.front_default} 
            alt={pokemon ? pokemon.name : "pokemon sprite"} 
            width={size} height={size}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Box width="100%">
        <Typography variant="h6">{pokemon.name}</Typography>
        
        {info && open ? (
          <Box 
            className={styles.row} 
            sx={{ justifyContent: "space-evenly" }}
          >
            {info.types.map((type) => (
              <Chip 
                key={type.type.name}
                label={type.type.name} 
                variant="outlined" 
              />
            ))}
          </Box>
        ) : (
          <></>
        )}
      </Box>

      {/* {open ? (
        <Box 
          className={styles.row} 
          sx={{ justifyContent: "space-evenly" }}
        >
          {info ? (
            info.types.map((type) => (
              <Chip 
                key={type.type.name}
                label={type.type.name} 
                variant="outlined" 
              />
            ))
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <></>
      )} */}
    </li>
  )
}