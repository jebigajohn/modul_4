import React, { useRef } from 'react'
import supabase from '../../utils/supabase'
import { useNavigate } from 'react-router'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('Login funktioniert nicht', error)
      }
      console.log('Login war erfolgreich', data)
      navigate('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              ref={emailRef}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              ref={passwordRef}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-3">
            Still have not Account?{' '}
            <a
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
