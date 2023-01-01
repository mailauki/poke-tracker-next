import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Pokeball from '../components/icons/Pokeball'
import { Box, Typography, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Tooltip, Avatar } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import MenuIcon from '@mui/icons-material/Menu'
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'

export default function Header({ open, onOpen }) {
  const supabase = useSupabaseClient()
  const session = useSession()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  function handleOpenMenu(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleCloseMenu(setting) {
    console.log(setting)
    setAnchorEl(null)

    switch (setting) {
      case "Account":
        router.push("/account")
        break;
      case "Logout":
        supabase.auth.signOut()
        router.push("/")
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if(session) getAvatarUrl()
  }, [session])

  async function getAvatarUrl() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

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
            <Box className={styles.logo} href="/" component="a">
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

          {session ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar src={avatarUrl} />
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
                <MenuItem key={setting} onClick={() => handleCloseMenu(setting)}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}