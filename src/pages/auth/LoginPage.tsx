import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authApi } from '@/features/auth/authApi'
import { useAuthStore } from '@/features/auth/authStore'
import { getApiError } from '@/lib/axios'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export function LoginPage() {
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const submit = async (values: FormData) => {
    setServerError('')
    try {
      const response = await authApi.login(values)
      setSession(response.access_token, response.refresh_token, response.user)
      navigate((location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/', { replace: true })
    } catch (error) {
      setServerError(getApiError(error))
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual__content"><span className="brand__mark">F</span><p className="eyebrow">Fake Store System</p><h1>Your store, clearly managed.</h1><p>A clean workspace for products, customers, orders, payments, and reporting.</p></div>
        <div className="floating-card floating-card--one">20 products <span>↗</span></div>
        <div className="floating-card floating-card--two">Payments healthy <span>●</span></div>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit(submit)}>
          <div><p className="eyebrow">Welcome back</p><h2>Sign in to your account</h2><p className="muted">Use credentials accepted by the FastAPI authentication endpoint.</p></div>
          {serverError ? <div className="alert alert--error">{serverError}<small>The current backend does not yet expose <code>/auth/login</code>.</small></div> : null}
          <Input label="Email" type="email" placeholder="you@example.com" autoComplete="email" error={errors.email?.message} {...register('email')} />
          <Input label="Password" type="password" placeholder="••••••••" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
          <div className="form-row form-row--between"><label className="checkbox"><input type="checkbox" /> Remember me</label><Link to="/forgot-password">Forgot password?</Link></div>
          <Button type="submit" loading={isSubmitting}>Sign in</Button>
          <p className="auth-switch">New to Fake Store? <Link to="/signup">Create an account</Link></p>
        </form>
      </section>
    </main>
  )
}
