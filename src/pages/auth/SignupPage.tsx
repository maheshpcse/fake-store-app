import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authApi } from '@/features/auth/authApi'
import { useAuthStore } from '@/features/auth/authStore'
import { getApiError } from '@/lib/axios'

const schema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  username: z.string().min(3, 'Use at least 3 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' })
type FormData = z.infer<typeof schema>

export function SignupPage() {
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const submit = async (formData: FormData) => {
    const values = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }
    try {
      const response = await authApi.signup(values)
      setSession(response.access_token, response.refresh_token, response.user)
      navigate('/')
    } catch (error) { setServerError(getApiError(error)) }
  }
  return (
    <main className="auth-page auth-page--simple">
      <form className="auth-form auth-form--wide" onSubmit={handleSubmit(submit)}>
        <div><p className="eyebrow">Create account</p><h1>Join Fake Store</h1><p className="muted">Set up your access to the store workspace.</p></div>
        {serverError ? <div className="alert alert--error">{serverError}<small>The current backend does not yet expose <code>/auth/signup</code>.</small></div> : null}
        <div className="form-grid">
          <Input label="First name" error={errors.first_name?.message} {...register('first_name')} />
          <Input label="Last name" error={errors.last_name?.message} {...register('last_name')} />
          <Input label="Username" error={errors.username?.message} {...register('username')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
          <Input label="Confirm password" type="password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        </div>
        <Button type="submit" loading={isSubmitting}>Create account</Button>
        <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
      </form>
    </main>
  )
}
