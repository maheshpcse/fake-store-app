import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  return (
    <main className="auth-page auth-page--simple">
      <form className="auth-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
        <div><p className="eyebrow">Account recovery</p><h1>Forgot your password?</h1><p className="muted">This is a UI-only flow. Password-reset delivery can be connected when the backend route is available.</p></div>
        {sent ? <div className="alert alert--success">If that account exists, reset instructions will be sent.</div> : <Input required label="Email address" type="email" placeholder="you@example.com" />}
        <Button type="submit">{sent ? 'Send again' : 'Send reset link'}</Button>
        <p className="auth-switch"><Link to="/login">← Back to sign in</Link></p>
      </form>
    </main>
  )
}
