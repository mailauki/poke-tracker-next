import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import AvatarForm from './AvatarForm'
import { Button, TextField, Box } from '@mui/material'

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
      router.push("/")
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        value={session.user.email} 
        disabled
        margin="normal"
      />
      <TextField 
        id="username" 
        label="Username" 
        variant="outlined"
        value={username || ""} 
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <AvatarForm
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, avatar_url: url })
        }}
      />

      <Button
        onClick={() => updateProfile({ username, avatar_url })}
        disabled={loading}
        variant="contained"
        sx={{ mt: 2 }}
      >
        {loading ? 'Loading ...' : 'Update'}
      </Button>
    </Box>
  )
}