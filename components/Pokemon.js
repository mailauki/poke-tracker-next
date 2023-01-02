import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Pokeball from '../components/icons/Pokeball'
import { CircularProgress, Box, Chip, Typography, Checkbox } from '@mui/material'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Pokemon({ pokemon, open, onOpen, checked }) {
  const [info, setInfo] = useState(null)
  const supabase = useSupabaseClient()
  const session = useSession()
  const [isCollected, setIsCollected] = useState(false)
  const size = open ? 200 : 100

  useEffect(() => {
    if(checked) setIsCollected(checked.is_collected)
  }, [checked])

  useEffect(() => {
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

  async function updateCheck() {
    // console.log(pokemon.name)
    // console.log(isCollected)
    // console.log(checked.id)

    try {
      const updates = checked ? {
        id: checked.id,
        name: pokemon.name, 
        user_id: session.user.id, 
        is_collected: !isCollected
      } : {
        name: pokemon.name, 
        user_id: session.user.id, 
        is_collected: true
      }

      const { data, error } = await supabase
        .from('pokemon')
        .upsert(updates)
        .select('is_collected')

      if (error) throw error
      // alert('Checks updated!')

      if(data) setIsCollected(data[0].is_collected)
    } catch (error) {
      alert('Error loading data!')
      console.log(error)
    }
  } 

  return (
    <li 
      className={`${styles.card} ${!open ? styles.open : ""}`} 
      onClick={(e) => {
        e.target.type === "checkbox" ? (
          updateCheck()
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
          checked={isCollected}
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