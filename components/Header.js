import React from 'react'
import styles from '../styles/Home.module.css'
import Pokeball from '../components/icons/Pokeball'
import { Box, Typography, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Tooltip, Avatar } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import MenuIcon from '@mui/icons-material/Menu'

export default function Header({ open, onOpen }) {
  
  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
  // const [anchorEl, setAnchorEl] = React.useState(null)

  // function handleOpenMenu(e) {
  //   setAnchorEl(e.currentTarget)
  // }

  // function handleCloseMenu() {
  //   setAnchorEl(null)
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ color: "inherit" }}
        className={styles.header}
      >
        <Toolbar>
          {open ? (
            <IconButton onClick={() => onOpen(false)}>
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : (
            <Box className={styles.logo}>
              <Box sx={{ display: { xs: "flex", md: "none" }, mr: 0.75 }}>
                <Pokeball size={30} />
              </Box>
              
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: ".02rem",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                PokeTracker
              </Typography>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }}>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}