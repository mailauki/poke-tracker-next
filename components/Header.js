import styles from '../styles/Home.module.css'
import Pokeball from '../components/icons/Pokeball'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export default function Header({ open, onOpen }) {
  return (
    <header className={styles.header}>
      {!open ? (
        <Box className={styles.title}>
          <Pokeball size="2rem" />

          <Typography variant="h4">
            PokeTracker
          </Typography>
        </Box>
      ) : (
        <IconButton onClick={() => onOpen(false)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      )}
    </header>
  )
}