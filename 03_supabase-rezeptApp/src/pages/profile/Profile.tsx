import React, { useContext, useEffect, useMemo, useState } from 'react'
import type { IUser } from '../../interfaces/IUser'
import { mainContext } from '../../context/MainProvider'
import supabase from '../../utils/supabase'
import { Link } from 'react-router'
import { uploadPhoto } from '../../functions/uploadPhoto'

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

  // Fallback-Avatar
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

  // === Username-Validierung ===
  // Regeln: 3–20 Zeichen, nur a-z 0-9 _ -
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

  // === Upload-Button UX ===
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
      {user ? (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Your Profile
          </h2>

          <div className="flex flex-col items-center space-y-3">
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 shadow-md"
            />
          </div>

          {/* Upload */}
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) setProfilePhoto(e.target.files[0])
              }}
              className="w-full text-gray-700 dark:text-gray-300"
              disabled={uploading}
            />
            {profilePhoto && (
              <button
                onClick={handleUploadPhoto}
                disabled={uploading}
                className={`w-full rounded-lg py-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg
                  ${
                    uploading
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }
                `}
              >
                {uploading ? 'Uploading…' : 'Upload Photo'}
              </button>
            )}
          </div>

          {/* Username-Editor */}
          <div
            onDoubleClick={handleDoubleClick}
            className="cursor-pointer p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Username
            </p>

            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Change your username"
                  value={newUserName}
                  onChange={(e) => {
                    setNewUserName(e.target.value)
                    setUsernameError(validateUsername(e.target.value))
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                    ${
                      usernameError
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }
                    bg-white dark:bg-gray-800 dark:text-white
                  `}
                />
                {usernameError && (
                  <p className="text-sm text-red-600">{usernameError}</p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 rounded-lg py-2 border"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={
                      !!usernameError ||
                      newUserName.trim() === (user.username || '').trim()
                    }
                    className={`flex-1 rounded-lg py-2 font-semibold transition
                      ${
                        !!usernameError ||
                        newUserName.trim() === (user.username || '').trim()
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }
                    `}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                {user.username}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Firstname: <span className="font-medium">{user.firstname}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lastname: <span className="font-medium">{user.lastname}</span>
            </p>
          </div>

          <Link
            to="/"
            className="block text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading profile...
        </p>
      )}
    </div>
  )
}
