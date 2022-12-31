import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Button, Box, Avatar } from '@mui/material'

export default function AvatarForm({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
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

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Avatar
        src={avatarUrl}
        alt="Avatar" 
        sx={{ height: size, width: size, margin: "0 auto", backgroundColor: "divider" }}
      />
      <Button variant="contained" component="label" sx={{ mt: 1 }}>
        {uploading ? 'Uploading ...' : 'Upload'}
        <input 
          hidden 
          accept="image/*" 
          type="file" 
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </Button>
    </Box>
  )
}