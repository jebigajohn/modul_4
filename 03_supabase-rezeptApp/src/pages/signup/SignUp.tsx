import React from 'react'
import { Link } from 'react-router'
import supabase from '../../utils/supabase'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export default function SignUp() {
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const signUpData = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
      username: string
      firstname: string
      lastname: string
    }

    // # Variante 1
    // try {
    //   const { data, error } = await supabase.auth.signUp({
    //     email: signUpData.email,
    //     password: signUpData.password,
    //     options: {
    //       data: {
    //         username: signUpData.username,
    //         firstname: signUpData.firstname,
    //         lastname: signUpData.lastname,
    //       },
    //     },
    //   })

    console.log(signUpData)

    // # Variante 2
    const { email, password, username, firstname, lastname } = signUpData

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            firstname: firstname,
            lastname: lastname,
          },
        },
      })

      if (error) {
        console.error('Fehler beim SignUp', error)
      }
      console.log('SignUp war erfolgreich', data)
    } catch (error) {
      console.error('Fehler beim SignUp', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="firstname">Firstname</Label>
            <Input type="text" name="firstname" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="lastname">Lastname</Label>
            <Input type="text" name="lastname" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" required />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-3">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
