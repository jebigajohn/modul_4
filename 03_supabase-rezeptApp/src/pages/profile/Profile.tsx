import React, { useContext, useEffect, useMemo, useState } from 'react'
import type { IUser } from '../../interfaces/IUser'
import { mainContext } from '../../context/MainProvider'
import supabase from '../../utils/supabase'
import { Link } from 'react-router'
import { uploadPhoto } from '../../functions/uploadPhoto'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

interface IProfileProps {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function Profile() {
  const { user, setUser } = useContext(mainContext) as IProfileProps

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newUserName, setNewUserName] = useState<string>('')
  const [usernameError, setUsernameError] = useState<string>('')

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  const avatarSrc = useMemo(
    () =>
      user?.img_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    [user?.img_url]
  )

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: customer, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', user.id)
      if (error) {
        console.error('Fehler beim fetch', error)
      } else {
        setUser(customer?.[0] || null)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function validateUsername(name: string): string {
    if (!name || name.trim().length < 3) return 'Mindestens 3 Zeichen.'
    if (name.trim().length > 20) return 'Maximal 20 Zeichen.'
    if (!/^[a-z0-9_-]+$/i.test(name.trim()))
      return 'Nur Buchstaben, Zahlen, Unterstrich (_) und Bindestrich (-).'
    return ''
  }

  function handleDoubleClick() {
    if (user) {
      const start = user.username || ''
      setNewUserName(start)
      setUsernameError(validateUsername(start))
      setIsEditing(true)
    }
  }

  async function handleSave() {
    if (!user) return
    const err = validateUsername(newUserName)
    setUsernameError(err)
    if (err) return

    if (newUserName === user.username) {
      setIsEditing(false)
      return
    }

    const { error } = await supabase
      .from('customers')
      .update({ username: newUserName.trim() })
      .eq('id', user.id)

    if (error) {
      console.error('Fehler beim speichern', error)
    } else {
      await fetchData()
    }
    setIsEditing(false)
  }

  async function handleUploadPhoto() {
    if (!profilePhoto || !user) return null
    setUploading(true)
    try {
      const imgUrl = await uploadPhoto(profilePhoto)
      if (imgUrl) {
        setUser((prev) => (prev ? { ...prev, img_url: imgUrl } : prev))
        await supabase
          .from('customers')
          .update({ img_url: imgUrl })
          .eq('id', user.id)
      }
    } catch (error) {
      console.error('Fehler beim Upload des Fotos', error)
    } finally {
      setUploading(false)
      setProfilePhoto(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      {user ? (
        <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Your Profile</h2>

          <div className="flex flex-col items-center space-y-3">
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-border shadow"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) setProfilePhoto(e.target.files[0])
              }}
              disabled={uploading}
            />
            {profilePhoto && (
              <Button
                onClick={handleUploadPhoto}
                disabled={uploading}
                className="w-full"
                variant={uploading ? 'secondary' : 'default'}
              >
                {uploading ? 'Uploading…' : 'Upload Photo'}
              </Button>
            )}
          </div>

          <div
            onDoubleClick={handleDoubleClick}
            className="cursor-pointer p-4 bg-secondary rounded-lg"
          >
            <p className="text-sm text-secondary-foreground/90 mb-1">
              Username
            </p>

            {isEditing ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Change your username"
                  value={newUserName}
                  onChange={(e) => {
                    setNewUserName(e.target.value)
                    setUsernameError(validateUsername(e.target.value))
                  }}
                />
                {usernameError && (
                  <p className="text-sm text-destructive">{usernameError}</p>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={
                      !!usernameError ||
                      newUserName.trim() === (user.username || '').trim()
                    }
                    className="flex-1"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-lg font-medium">{user.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <p>
              Firstname: <span className="font-medium">{user.firstname}</span>
            </p>
            <p>
              Lastname: <span className="font-medium">{user.lastname}</span>
            </p>
          </div>

          <Link
            to="/"
            className="block text-center text-sm text-primary hover:underline mt-2"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">Loading profile...</p>
      )}
    </div>
  )
}
